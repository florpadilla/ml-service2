/*
@cocoSsd.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const cocoSsd = require('@tensorflow-models/coco-ssd');
const tf = require('@tensorflow/tfjs-node');
const MachineLearningException = require('../../Exceptions/machineLearning.exception');
const fs = require('fs').promises;
const FilterResults = require('../../helpers/filterResults.helper');
const ObjectDetection = require('../objectDetection.model');

// Represents the object recognition system
class CocoSsd extends ObjectDetection {
  
  constructor(pathFile, percentage, objectRequired) {
    super();
    this.pathFile = pathFile;
    this.percentage = percentage;
    this.objectRequired = objectRequired;
  }

  // Allows to load the model and decode the image in order to make a detection of the desired object.
  async predict() {
    const model = await cocoSsd.load();
    const imagesArray = await fs.readdir(this.pathFile);
    const channels = 3;
    const imagesToPredictArray = await Promise.all(
      imagesArray.map(async (fileName) => {
        const img = await fs.readFile(`${this.pathFile}${fileName}`);
        const imgTensor = tf.node.decodeImage(new Uint8Array(img), channels);
        const predict = await model.detect(imgTensor);
        const data = { predict, fileName };
        return data;
      })
    ).catch(() =>{
      throw new MachineLearningException('Error building model COCO.', 'ML-01');
    });
    const foundObjectsArray = FilterResults.filterFunction(
      imagesToPredictArray,
      this.objectRequired,
      this.percentage
    );
    return foundObjectsArray;
  }
}

module.exports = CocoSsd;
