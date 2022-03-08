/*
@decompress.helper.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const admZip = require('adm-zip');
const fs = require('fs');
const InvalidFileException = require('../Exceptions/invalidFile.exception');

//Decompress a zip file
class Decompress {

  //Receives a zipPath and extracts all the files to an specific folder. Returns true when the process finished
  static decompressFile(zipPath) {
    try {
      const zip = new admZip(zipPath);
      const filePath = `${__dirname}/../../files/uploads/images/decompress/`;
      fs.mkdirSync(filePath, { recursive: true });
      zip.extractAllTo(filePath, true);
      return {
        decompressed: fs.existsSync(filePath),
        path: filePath
      };
    } catch(error) {
      throw new InvalidFileException('The file is an Invalid File','InvalidFile');
    }
  }
}

module.exports = Decompress;
