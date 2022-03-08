/*
@yolo.model.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const Yolo = require('../src/model/models/yolo.model');
const dotenv = require('dotenv');
const MachineLearningException = require('../src/Exceptions/machineLearning.exception');
dotenv.config();
const path = require('path');

describe('Yolo Test', () => {
  test('Folder with invalid files', async () => {
    const pathFile = path.join(__dirname, './files/');
    const percentage = 0.5;
    const objectRequired = 'cat';
    const yolo = new Yolo(pathFile, percentage, objectRequired);
    try{
      const result = await yolo.predict();
    }catch (e) {
      expect(e.message).toEqual('Error building model YOLO.');
    }
  }, 500000);

  test('Invalid percentage', async () => {
    const pathFile = path.join(__dirname, './files/decompress/');
    const percentage = 'hola';
    const objectRequired = 'cat';
    const yolo = new Yolo(pathFile, percentage, objectRequired);
    try{
      const result = await yolo.predict();
    }catch (e) {
      expect(e.message).toEqual('Error building model YOLO.');
    }
  }, 500000);
});
