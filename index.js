const express = require('express');
const errorMiddleware = require('./middlewares/error');
const validations = require('./middlewares/validations');
const productsController = require('./controllers/productsController');
require('dotenv').config();

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.POST('/products', validations.valName, validations.valQuantity, productsController.create);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
