/*
@filterResults.helper.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const FilterResults = require('../src/helpers/filterResults.helper');
const path = require('path');
const MachineLearningException = require('../src/Exceptions/machineLearning.exception');

describe('FilterResults test', () => {
  test('percentage is not a number', () => {
    const filterResults = FilterResults;
    const objectRequired = 'dog';
    const percentage = 'hola';
    const imagesToPredictArray = path.join(
      __dirname,
      './files/decompress/'
    );
    expect(() => {
      filterResults.filterFunction(
        imagesToPredictArray,
        objectRequired,
        percentage
      );
    }).toThrow(MachineLearningException);
  });

  test('valid parameters', () => {
    const filterResults = FilterResults;
    const objectRequired = 'dog';
    const percentage = 0.5;
    const imagesToPredictArray = path.join(
      __dirname,
      './files/decompress/'
    );
    expect(() => {
      filterResults.filterFunction(
        imagesToPredictArray,
        objectRequired,
        percentage
      );
    }).not.toThrow(MachineLearningException);
  });
});
