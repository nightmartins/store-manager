const express = require('express');
const bodyParser = require('body-parser');
// const errorMiddleware = require('./middlewares/error');
// const productsController = require('./controllers/productsController');
const { getById, getAll, create, update, remove } = require('./controllers/productsController');
// const validations = require('./middlewares/validations');
const { valSearch, valName, valQuantity, valUpdate } = require('./middlewares/validations');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', valSearch, getById);

app.get('/products', getAll);

app.post('/products', valName, valQuantity, create);

app.put('/products/:id', valUpdate, valSearch, update);

app.delete('/products/:id', remove);

// app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
