/*
@mobilenet.model.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const FilterResults = require('../../helpers/filterResults.helper');
const ObjectDetection = require('../objectDetection.model');
const MachineLearningException = require('../../Exceptions/machineLearning.exception');


// Represents the object recognition system
class MobileNet extends ObjectDetection {
  constructor(pathFile, percentage, objectRequired) {
    super();
    this.pathFile = pathFile;
    this.percentage = percentage;
    this.objectRequired = objectRequired;
  }

  // Allows to load the model and decode the image in order to make a detection of the desired object.
  async predict() {
    const topkNumber = 1;
    const imagesArray = await fs.readdir(this.pathFile);
    const mobilenetModel = await mobilenet.load();
    const imagesToPredictArray = await Promise.all(
      imagesArray.map(async (fileName) => {
        const imageBuffer = await fs.readFile(`${this.pathFile}${fileName}`);
        const tfimage = tfnode.node.decodeImage(imageBuffer);
        const predict = await mobilenetModel.classify(tfimage, topkNumber);
        const data = { predict, fileName };
        return data;
      })
    ).catch((error) => {
      throw new MachineLearningException(
        'Error building model MOBILENET.',
        'ML-01'
      );
    });
    const foundObjectsArray = FilterResults.filterFunction(
      imagesToPredictArray,
      this.objectRequired,
      this.percentage
    );
    return foundObjectsArray;
  }
}

module.exports = MobileNet;
