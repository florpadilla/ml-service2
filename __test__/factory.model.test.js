/*
@factory.model.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const FactoryModel = require('../src/model/factory.model');
const CocoSsd = require('../src/model/models/cocoSsd.model');
const Yolo = require('../src/model/models/yolo.model');
const MachineLearningException = require('../src/Exceptions/machineLearning.exception');
const MobileNet = require('../src/model/models/mobilenet.model');

describe('Test Factory Model. Happy Path', () => {
  test('Create Yolo instance', () => {
    const folderFile = '../__test__/files/13.jpg';
    const object = 'dog';
    const percentage = 0.5;
    const result = FactoryModel.chooseModel(
      folderFile,
      'yolo',
      object,
      percentage
    );
    expect(result).toBeInstanceOf(Yolo);
  });

  test('Create Coco instance', () => {
    const folderFile = '../__test__/files/13.jpg';
    const object = 'dog';
    const percentage = 0.5;
    const result = FactoryModel.chooseModel(
      folderFile,
      'coco',
      object,
      percentage
    );
    expect(result).toBeInstanceOf(CocoSsd);
  });

  test('Create MobileNet instance', () => {
    const folderFile = '../__test__/files/13.jpg';
    const object = 'dog';
    const percentage = 0.5;
    const result = FactoryModel.chooseModel(
      folderFile,
      'mobilenet',
      object,
      percentage
    );
    expect(result).toBeInstanceOf(MobileNet);
  });
});

describe('Test Factory Model', () => {
  test('Create invalid instance', () => {
    const folderFile = '../__test__/files/13.jpg';
    const object = 'dog';
    const percentage = 0.5;
    expect(() => {
      FactoryModel.chooseModel(folderFile, 'sdfsdf', object, percentage);
    }).toThrow(MachineLearningException);
  });

  test('Empty input', () => {
    const folderFile = '../__test__/files/13.jpg';
    const object = 'dog';
    const percentage = 0.5;
    expect(() => {
      FactoryModel.chooseModel(folderFile, '', object, percentage);
    }).toThrow(MachineLearningException);
  });
});
