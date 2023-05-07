const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const menuController = require('./src/controller/pizza-menu');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('The backend is alive!!');
});

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