/*
@handler.file.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const Decompress = require('./decompress.helper');
const path = require('path');

// Allows to decide between zip files and images and create the path file
class HandlerFile {
  
  // Returns the file folder when decide if is an image or a zip file
  static fileFolder (req, zipName) {

    let folderFile = '';
    if (typeof zipName == 'undefined') {
      const imageName = req.files[0].originalname.split('.')[0];
      folderFile = path.join(__dirname, `../../files/uploads/images/image-${imageName}/`);
    } else {
        const decompressedFilePath = Decompress.decompressFile(
        `${__dirname}/../../files/uploads/zips/${zipName}`
      );
      folderFile = decompressedFilePath.path;
      if (!decompressedFilePath.decompressed) {
        return 'The file has not been unziped';
      }
    }
    return folderFile;
  }
}

module.exports = HandlerFile;
