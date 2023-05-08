const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const port = 3001;
const menuController = require('./src/controller/pizza-menu');
const googleAuthController = require('./src/controller/google-auth');

// ------------------ CONFIGURATION --------------------------
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


app.use(express.json());

app.use(cors({
  origin: '*'
}));

// ------------------ ROUTES ----- --------------------------
app.get('/', (req, res) => {
  res.send('The backend is alive!!');
});

app.get('/auth/google', googleAuthController.generateAuthUrl);
app.get('/auth/google/callback', googleAuthController.getUserInfoAndRedirectToApp);
app.get('/user-info', googleAuthController.getUserInfo);

app.get('/menu', menuController.allMenuData);
app.post('/restore-menu', menuController.populateMenuAgain);
app.post('/create-menu-item', menuController.addMenuData);
app.post('/delete-menu-item', menuController.deleteMenuData);
app.post('/update-menu-item', menuController.updateMenuData);

app.post('/sign-up', (req, res) => {
  res.send("Usuário criado")
});
app.post('/sign-in', (req, res) => {
  res.send("Usuário logado")
});