/*
@factory.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const CocoSsd = require('./models/cocoSsd.model');
const Yolo = require('./models/yolo.model');
const path = require('path');
const MachineLearningException = require('../Exceptions/machineLearning.exception');
const MobileNet = require('./models/mobilenet.model');

// Allows to handle the model chosen by the user
class FactoryModel {
  
  // Chooses a model
  static chooseModel(folderFile, model, object, percentage) {
       
    if (model == 'coco') {
      return new CocoSsd(folderFile, percentage, object)
    } else if (model == 'yolo') {
      return new Yolo(folderFile, percentage, object)
    } else if (model == 'mobilenet') {
      return new MobileNet(folderFile, percentage, object)
    } else {
      throw new MachineLearningException(`${model} is not a recognized model, you can choose between coco, yolo or mobilenet`,
      'LATAM03')
    }
  }
}

module.exports = FactoryModel;
