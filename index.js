const express = require('express');
const bodyParser = require('body-parser');
// const errorMiddleware = require('./middlewares/error');
const validations = require('./middlewares/validations');
const productsController = require('./controllers/productsController');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', validations.valSearch, productsController.getById);

app.get('/products', productsController.getAll);

app.post('/products', validations.valName, validations.valQuantity, productsController.create);

// app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
