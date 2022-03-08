/*
@objectDetection.model.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

// Builds to predict objects and inherits to CocoSsd and Yolo
class ObjectDetection {

    constructor() {
      if (this.constructor == ObjectDetection) {
        throw new Error('Error: ObjectDetection abstract class cannot be instantiated.');
      }
    }
    
    // Predict objects 
    predict() {
      throw new Error('Error: predict() must be implemented');
    }
  }
  
  module.exports = ObjectDetection;
