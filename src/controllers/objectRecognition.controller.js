/*
@objectRecognition.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const ModelFacade = require('../model/model.facade');
const HandlerFile = require('../helpers/handler.file');

// Controls the model that will be used to detect the object
class ObjectRecognitionController {

  // Returns the results of the detection according to the model, object and percentage indicated
  static async recognizeObject(req, res) {

    const { zipName, percentage, object, model } = req.body;
    try {
      const folderFile = HandlerFile.fileFolder(req, zipName);
      res.send(await ModelFacade.giveResult(folderFile, model, object, percentage));
    } catch (error) {
      res.status(error.status).send({
        Error: error.message,
        Code: error.code
      });
    }
  }
}

module.exports = ObjectRecognitionController;
