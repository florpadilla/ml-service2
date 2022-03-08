/*
@yolo.model.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

require('regenerator-runtime');
const tf = require('@tensorflow/tfjs');
const tfnode = require('@tensorflow/tfjs-node');
const fs = require('fs').promises;
const yolov5 = require('yolov5');
const FilerResults = require('../../helpers/filterResults.helper');
const ObjectDetection = require('../objectDetection.model');
const MachineLearningException = require('../../Exceptions/machineLearning.exception');

// Represents the object recognition system
class Yolo extends ObjectDetection {

  constructor(pathFile, percentage, objectRequired) {
    super();
    this.pathFile = pathFile;
    this.percentage = percentage;
    this.objectRequired = objectRequired;
  }

  // Allows to load the model and decode the image in order to make a detection of the desired object.
  async predict() {
    const channels = 3;
    const imagesArray = await fs.readdir(this.pathFile);
    const yolo = yolov5;
    await yolo.load();
    const imagesToPredictArray = await Promise.all(
      imagesArray.map(async (fileName) => {
        const img = await fs.readFile(`${this.pathFile}${fileName}`);
        const imgDecoded = tfnode.node.decodeImage(img, channels);
        const imgResized = tf.image.resizeBilinear(imgDecoded, [640, 640]);
        const image = tf
          .cast(imgResized, 'float32')
          .div(tf.scalar(255))
          .expandDims(0);
        const result = await yolo.predict(image);
        const predict = yolo.getDetections(result);
        const data = { predict, fileName };
        return data;
      })
    ).catch(error =>{
      throw new MachineLearningException('Error building model YOLO.', 'ML-02');
    });
    const foundObjectsArray = FilerResults.filterFunction(
      imagesToPredictArray,
      this.objectRequired,
      this.percentage
    );
    return foundObjectsArray;
  }
}

module.exports = Yolo;
