const express = require('express');
const bodyParser = require('body-parser');
// const errorMiddleware = require('./middlewares/error');
const { getById, getAll, create, update, remove } = require('./controllers/productsController');
const { getAllSales, createSale } = require('./controllers/salesController');
const {
  valSearch,
  valName,
  valQuantity,
  valUpdate,
  valSaleId,
  valSaleQ,
} = require('./middlewares/validations');
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

app.get('/sales', getAllSales);
// app.get('/sales/:id', );
app.post('/sales', valSaleId, valSaleQ, createSale);

// app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
