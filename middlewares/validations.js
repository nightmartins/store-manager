const rescue = require('express-rescue');
const productsServices = require('../services/productsService');

const valName = rescue(async (req, res, next) => {
  const { name } = req.body;
  const allProducts = await productsServices.getAll();

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  if (allProducts.find((prod) => prod.name === name)) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  next();
});

const valQuantity = rescue((req, res, next) => {
  const { quantity } = req.body;
  const quantityMessage = '"quantity" must be a number larger than or equal to 1';
  
  if (typeof quantity === 'string' || quantity < 1) {
    return res.status(422).json({ message: `${quantityMessage}` });
  }
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
});

const valSearch = rescue(async (req, res, next) => {
  const { id } = req.params;
  const allProducts = await productsServices.getAll();
  const search = allProducts.find((prod) => prod.id === Number(id));
  if (!search) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
});

const valUpdate = rescue((req, res, next) => {
  const { name, quantity } = req.body;
  const quantityMessage = '"quantity" must be a number larger than or equal to 1';

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }  
  if (typeof quantity === 'string' || quantity < 1) {
    return res.status(422).json({ message: `${quantityMessage}` });
  }
  next();
});

// const valNewSale = rescue((req, res, next) => {
//   const { body } = req;
//   const quantityMessage = '"quantity" must be a number larger than or equal to 1';
  
//   const valId = body.map(body.itemsSold.product_id === null);
//   const valQuant = body.map(typeof body.itemsSold.quantity === 'string');
//   const valNegQuant = body.map(body.itemsSold.quantity < 1);
//   const valReqQuant = body.map(body.itemsSold.quantity === null);

//   if (valId) return res.status(400).json({ message: '"product_id" is required' });
//   if (valQuant) return res.status(422).json({ message: `${quantityMessage}` });
//   if (valNegQuant) return res.status(422).json({ message: `${quantityMessage}` });
//   if (valReqQuant) return res.status(400).json({ message: '"quantity" is required' });
    
//   next();
// });

// const valSaleId = rescue((req, res, next) => {
//   const { body } = req;
//   const valId = [];

//   body.forEach((element) => {
//     if (!element.product_id) {
//       valId.push('a');
//     }
//   });

//   if (valId) return res.status(400).json({ message: '"product_id" is required' });

//   next();
// });

// const valSaleQ = rescue((req, res, next) => {
//   const { body } = req;
//   const quantityMessage = '"quantity" must be a number larger than or equal to 1';
//   const valQuant = [];
//   const valReq = [];

//   body.forEach((element) => {
//     if (typeof element.quantity === 'string' || element.quantity < 1) {
//       valQuant.push('a');
//     }
//   });
//   body.forEach((element) => {
//     if (!element.quantity) {
//       valReq.push('a');
//     }
//   });
//   if (valQuant) return res.status(422).json({ message: `${quantityMessage}` });
//   if (valReq) return res.status(400).json({ message: '"quantity" is required' });
//   next();
// });

// const valSaleId = (req, res, next) => {
//   const { body } = req;

//   body.forEach((element) => {
//     if (!element.product_id) {
//       return res.status(400).json({ message: '"product_id" is required' });
//     }
//   });
//   next();
// };

// const valSaleQ = (req, res, next) => {
//   const { body } = req;
//   body.forEach((element) => {
//     if ((!element.quantity && element.quantity !== 0)) {
//       return res.status(400).json({ message: '"quantity" is required' });
//     }

//     if (typeof element.quantity !== 'number' || element.quantity <= 0) {
//       return res
//       .status(422).json({ message: '"quantity" must be a number larger than or equal to 1' });
//     }
//   });
//   next();
// };
// Referência para correçâo da função: https://github.com/tryber/sd-014-b-store-manager/pull/28

// const valNewSale = rescue((req, res, next) => {
//   const { body } = req;
//   const quantityMessage = '"quantity" must be a number larger than or equal to 1';
  
//   body.forEach((element) => {
//     if (!element.product_id) {
//       return res.status(400).json({ message: '"product_id" is required' });
//     }
//   });
//   body.forEach((element) => {
//     if (typeof element.quantity === 'string' || element.quantity < 1) {
//       return res.status(422).json({ message: `${quantityMessage}` });
//     }
//   });
//   body.forEach((element) => {
//     if (!element.quantity) {
//       return res.status(400).json({ message: '"quantity" is required' });
//     }
//   });
//   next();
// });

module.exports = {
  valName,
  valQuantity,
  valSearch,
  valUpdate,
  // valNewSale,
  // valSaleId,
  // valSaleQ,
};
