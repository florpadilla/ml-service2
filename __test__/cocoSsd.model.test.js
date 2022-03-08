/*
@cocoSsd.model.test.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const CocoSsd = require('../src/model/models/cocoSsd.model');
const path = require('path');
const FilterResults = require('../src/helpers/filterResults.helper');

describe('Negative Test Coco model', () => {

  test('Error cause by wrong value in percentage parameter', async () => {
    const pathFile = path.join((__dirname), './files/decompress/');
    const percentage = 'hola';
    const objectRequired = 'dog';
    const cocoSsd = new CocoSsd(pathFile, percentage, objectRequired);
    try{
    const result = await cocoSsd.predict();
    } catch (e) {
      expect(e.message).toEqual('Error building model COCO.');
    }
  }, 500000);

  test('Exception cause by null value', async () => {
    const pathFile = path.join((__dirname), './files/decompress/');
    const percentage = null;
    const objectRequired = null;
    const cocoSsd = new CocoSsd(pathFile, percentage, objectRequired);
    try{
    const result = await cocoSsd.predict();
    } catch (error) {
      expect(error.message).toEqual('Error building model COCO.');
    }
  }, 50000);

  test('Exception cause by "undefined" parameter ', async () => {
    const imagesToPredictArray = {
      filename: '01',
      class: 'cat',  
      score: 0.9
    };
    const percentage = undefined;
    const objectRequired = 'cat';
    try{
      FilterResults.filterFunction(imagesToPredictArray, objectRequired, percentage);
    } catch (error) {
      expect(error.message).toEqual('Machine learning parameters');
    }
  }, 50000);
});
