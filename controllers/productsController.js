const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const products = await productsService.create({ name, quantity });
  res.status(201).json(products);
};

module.exports = {
  create,
};

/*
Quando a requisição é feita sem o atributo name :

  { "quantity": 100 }
sua API deve responder com status http 400 e o seguinte body:
  { "message": "\"name\" is required" }          
Quando a requisição é feita e contém o seguinte body:

  { "name": "pro", "quantity": 100 }
sua API deve responder com status http 422 e o seguinte body:
  { "message": "\"name\" length must be at least 5 characters long" }          
Quando a requisição é feita com o atributo name igual um já cadastrado:

  { "name": "produto", "quantity": 100 }
sua API deve responder com status http 409 e o seguinte body:
  { "message": "Product already exists" }          
point_right Para o endpoint POST /products, o campoquantity deve ser um número inteiro maior que 0.

Quando a requisição é feita sem o atributo quantity :

  { "name": "produto" }
sua API deve responder com status http 400 e o seguinte body:
  { "message": "\"quantity\" is required" }          
Quando a requisição é feita e contém os seguintes body:

  { "name": "produto", "quantity": "string" }
  { "name": "produto", "quantity": -1 }
  { "name": "produto", "quantity": 0 }
sua API deve responder com status http 422 e o seguinte body:
  { "message": "\"quantity\" must be a number larger than or equal to 1" }           
point_right Para o endpoint POST /products, quando a requisição é feita corretamente, o produto deve ser cadastrado.

Quando a requisição é feita e contém o seguinte body:
  { "name": "produto", "quantity": 10 }
sua API deve responder com status http 201 e o seguinte body:
  { "id": 1, "name": "produto", "quantity": 10 }         */