/*
@invalidFile.exception.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ServerException = require("./server.exception");

// Exception in case of invalid files 
class InvalidFileException extends ServerException {

  constructor(message, code) {
    const status = '400';
    super(message, status, code);
  }
}

module.exports = InvalidFileException;
