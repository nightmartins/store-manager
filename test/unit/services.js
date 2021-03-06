const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const productsService = require('../../services/productsService');
const salesService = require('../../services/salesService');

describe('Service de produtos', () => {
  describe('Buscas no banco de dados', () => {
    describe('Quando não há produtos cadastrados', () => {
      before(() => {
        sinon.stub(productsModel, 'getAll').resolves([]);
        sinon.stub(productsModel, 'getById').resolves([]);
      });

      after(() => {
        productsModel.getAll.restore();
        productsModel.getById.restore();
      });

      it('buscar por todos os produtos retorna um array', async () => {
        const search = await productsService.getAll();
        expect(search).to.be.an('array');
      });
      it('buscar por todos os produtos retorna um array vazio', async () => {
        const search = await productsService.getAll();
        expect(search).to.be.empty;
      });
      it('buscar 1 produto retorna um array vazio', async () => {
        const search = await productsService.getById(1);
        expect(search).to.be.empty;
      });
    });

    describe('Busca por todos os produtos', () => {
      before(() => {
        result = [
          {
            id: 1,
            name: 'Arroz',
            quantity: 356,
          },
          {
            id: 2,
            name: 'Feijão',
            quantity: 126,
          }
        ]
        sinon.stub(productsModel, 'getAll').resolves(result);
      });

      after(() => {
        productsModel.getAll.restore();
      });

      it('retorna um array', async () => {
        const response = await productsService.getAll();
        expect(response).to.be.an.an('array');
      });
      it('retorna um array não vazio', async () => {
        const response = await productsService.getAll();
        expect(response).not.to.be.empty;
      });
      it('contém as chaves corretas', async () => {
        const response = await productsService.getAll();
        expect(response[0]).to.include.all.keys('id', 'name', 'quantity');
      });
    });

    describe('Busca por produto específico', () => {
      before(() => {
        result = [{
          id: 1,
          name: 'Arroz',
          quantity: 356,
        }];
        sinon.stub(productsModel, 'getById').resolves(result);
      });

      after(() => {
        productsModel.getById.restore();
      });

      it('retorna um array', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.an.an('array');
      });
      it('retorna um array não vazio', async () => {
        const response = await productsService.getById(1);
        expect(response).not.to.be.empty;
      });
      it('contém as chaves corretas', async () => {
        const response = await productsService.getById(1);
        expect(response[0]).to.include.all.keys('id', 'name', 'quantity');
      });
      it('retorna somente 1 produto', async () => {
        const response = await productsService.getById(1);
        expect(response).to.have.lengthOf(1);
      });
    });
  });

  describe('Atualizar um produto', () => {
    before(async () => {
      const updated = {
        id: 1,
        name: 'Arroz',
        quantity: 356
      };
      sinon.stub(connection, 'execute').resolves([updated]);
    });

    after(async () => {
      connection.execute.restore();
    });

    const id = 1;
    const name = 'Arroz';
    const quantity = 356;

    it('retorna um objeto', async () => {
      const response = await productsService.update(id, name, quantity);
        expect(response).to.be.an('object');
    });
    it('o objeto não está vazio', async () => {
      const response = await productsService.update(id, name, quantity);
        expect(response).not.to.be.empty;
    });
    it('contém as chaves corretas', async () => {
      const response = await productsService.update(id, name, quantity);
        expect(response).to.include.all.keys('id', 'name', 'quantity');
    });
    it('com os valores corretos', async () => {
      const response = await productsService.update(id, name, quantity);
      expect(response).to.have.deep.property('id', 1);
      expect(response).to.have.deep.property('name', 'Arroz');
      expect(response).to.have.deep.property('quantity', 356);
      // Referência para obter os values: https://stackoverflow.com/questions/41726208/chai-testing-for-values-in-array-of-objects
    });
  });
});

describe('Service de vendas', () => {
  describe('Buscas no banco de dados', () => {
    describe('Quando não há vendas cadastrados', () => {
      before(() => {
        sinon.stub(salesService, 'getAllSales').resolves([]);
        sinon.stub(salesService, 'getSale').resolves([]);
      });

      after(() => {
        salesService.getAllSales.restore();
        salesService.getSale.restore();
      });

      it('buscar por todas as vendas retorna um array', async () => {
        const search = await salesService.getAllSales();
        expect(search).to.be.an('array');
      });
      it('buscar por todas as vendas retorna um array vazio', async () => {
        const search = await salesService.getAllSales();
        expect(search).to.be.empty;
      });
      it('buscar 1 venda retorna "undefined"', async () => {
        const search = await salesService.getSale(1);
        expect(search).to.be.empty;
      });
    });

    describe('Busca por todas as vendas', () => {
      before(() => {
        result = [
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:29.000Z",
            "product_id": 1,
            "quantity": 2
          },
          {
            "saleId": 1,
            "date": "2021-09-09T04:54:54.000Z",
            "product_id": 2,
            "quantity": 2
          }
        ]
        sinon.stub(salesModel, 'getAllSales').resolves(result);
      });

      after(() => {
        salesModel.getAllSales.restore();
      });

      it('retorna um array', async () => {
        const response = await salesService.getAllSales();
        expect(response).to.be.an.an('array');
      });
      it('retorna um array não vazio', async () => {
        const response = await salesService.getAllSales();
        expect(response).not.to.be.empty;
      });
      it('contém as chaves corretas', async () => {
        const response = await salesService.getAllSales();
        expect(response[0]).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
      });
    });

    describe('Busca por uma venda específica', () => {
      before(() => {
        result = [{
          date: 1,
          product_id: 1,
          quantity: 2,
        }];
        sinon.stub(salesModel, 'getSale').resolves(result);
      });

      after(() => {
        salesModel.getSale.restore();
      });

      it('retorna um array', async () => {
        const response = await salesService.getSale(1);
        expect(response).to.be.an.an('array');
      });
      it('retorna um array não vazio', async () => {
        const response = await salesService.getSale(1);
        expect(response).not.to.be.empty;
      });
      it('contém as chaves corretas', async () => {
        const response = await salesService.getSale(1);
        expect(response[0]).to.include.all.keys('date', 'product_id', 'quantity');
      });
      it('retorna somente 1 produto', async () => {
        const response = await salesService.getSale(1);
        expect(response).to.have.lengthOf(1);
      });
    });
  });
});
