const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const { products } = require('./mocks/product.model.mock')

const connection = require('../../../src/models/connection');

describe('Verificando model Product', function () {
  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productModel.findAll();

    expect(result).to.be.deep.equal(products);

  })

  it('Recuperando um produto a partir do seu id', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([products[0]]);
    // Act
    const result = await productModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(products[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
})