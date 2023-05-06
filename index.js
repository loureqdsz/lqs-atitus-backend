const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const menuController = require('./src/controller/pizza-menu');

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/menu', menuController.allMenuData);

app.post('/create-menu-item', (req, res) => {
  res.send("Item no menu criado")
});

app.post('/update-menu-item', (req, res) => {
  res.send("Item no menu atualizado")
});

app.post('/delete-menu-item', (req, res) => {
  res.send("Item no menu deletado")
});

app.post('/sign-up', (req, res) => {
  res.send("Usuário criado")
});

app.post('/sign-in', (req, res) => {
  res.send("Usuário logado")
});