/*
@multer.middleware.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const multer = require('multer');
const fs = require('fs');

// Validates the files before uploading in the project
function uploadImagesMiddleware() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const pathUpload = `${__dirname}/../../files/uploads/images/${
        file.mimetype.split('/')[0]
      }-${file.originalname.split('.')[0]}/`;
      fs.mkdirSync(pathUpload, { recursive: true });
      cb(null, pathUpload);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage,
  }).array('images');
  return upload;
}

module.exports = { uploadImagesMiddleware };
