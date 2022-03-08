/*
@mobilenet.model.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const MobileNet = require('../src/model/models/mobilenet.model');
const dotenv = require('dotenv');
const MachineLearningException = require('../src/Exceptions/machineLearning.exception');
dotenv.config();
const path = require('path');

describe('Mobilenet Test', () => {
  test('Happy Path', async () => {
    const pathFile = path.join(__dirname, './files/decompress/');
    const percentage = 0.5;
    const objectRequired = 'cat';
    const mobilenet = new MobileNet(pathFile, percentage, objectRequired);
    const result = await mobilenet.predict();
    expect(result).toEqual([]);
  }, 500000);

  test('Invalid File', async () => {
    const pathFile = path.join(__dirname, './files/');
    const percentage = 0.5;
    const objectRequired = 'cat';
    const mobilenet = new MobileNet(pathFile, percentage, objectRequired);
    try{
      const result = await mobilenet.predict();
    }catch (e) {
      expect(e.message).toEqual('Error building model MOBILENET.');
    }
  }, 500000);

  test('Invalid percentage', async () => {
    const pathFile = path.join(__dirname, './files/decompress/');
    const percentage = 'hola';
    const objectRequired = 'cat';
    const mobilenet = new MobileNet(pathFile, percentage, objectRequired);
    try{
      const result = await mobilenet.predict();
    }catch (e) {
      expect(e.message).toEqual('Machine learning parameters');
    }
  }, 500000);
});

