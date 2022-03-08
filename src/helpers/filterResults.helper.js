/*
@filterResults.helper.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const MachineLearningException = require("../Exceptions/machineLearning.exception");

// Filters found objects according to the received parameters
class FilterResults {
  
  // Returns the object based on the parameters chosen by users
  static filterFunction(imagesToPredictArray, objectRequired, percentage) {
    const foundObjectsArray = [];
    if(isNaN(percentage)){
      throw new MachineLearningException('Machine learning parameters','ML-percentage');
    }
    
    imagesToPredictArray.forEach((predictions) => {
      predictions.predict.every((prediction) => {
          if ((String(prediction.className).includes(objectRequired) || String(prediction.class).includes(objectRequired) ) &&
          (prediction.score >= percentage || prediction.probability >= percentage)
          ) {
          foundObjectsArray.push({
            Second: predictions.fileName.split('.')[0],
            object: prediction.class || prediction.className ,
            Score: prediction.score  || prediction.probability 
          });
          return false;
        } else {
          return true;
        }
      });
    });
    return foundObjectsArray;
  }
}

module.exports = FilterResults;
