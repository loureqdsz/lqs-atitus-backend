const { OAuth2Client } = require('google-auth-library');
const GOOGLE = require('../../secrets/secrets');

const GOOGLE_CLIENT_ID = GOOGLE.GOOGLE_CLIEND_ID;
const GOOGLE_CLIENT_SECRET = GOOGLE.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:3001/auth/google/callback'
const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URL);

let loggedUserInfo;

async function generateAuthUrl (req, res, next) {
    try {
        const authUrl = client.generateAuthUrl({
            access_type: 'offline',
            scope: ['profile', 'email'],
          });
        
          res.send({
            redirectUrl: authUrl
          });
    } catch (err) {
      console.log('--> Some Error Occur: ERR - ', err)
    }
}

async function getUserInfoAndRedirectToApp (req, res, next) {
    const { code } = req.query
  const { tokens } = await client.getToken(code)

  // Store the tokens in a secure manner, such as a database or environment variables
  client.setCredentials(tokens)
  try {
    // Get the user's information from the userinfo API
    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const userData = userInfo.data
    loggedUserInfo = {
      name: userData.name,
      email: userData.email,
      isAdmin: true
    }

    res.redirect(`http://localhost:3000/menu?dataLoaded=true`)
  } catch (error) {
    console.log('--> Some Error Occur: ERR - ', err)
    res.status(500).send('Failed to retrieve user information')
  }
}

async function getUserInfo (req, res, next) {
   res.status(200).send(loggedUserInfo)
}

module.exports = {
    generateAuthUrl,
    getUserInfoAndRedirectToApp,
    getUserInfo
}