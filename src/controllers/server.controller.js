/*
@server.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const express = require('express');
const cors = require('cors');

// Represents a server to be set up
class Server {
  
  constructor(port, path) {
    this._app = express();
    this._port = port;
    this._path = path;
    this.middleware();
    this.routes();
  }

  // Executes middleware of the server 
  middleware() {
    this._app.use(cors());
    this._app.use(express.json());
  }

  // Redirects to the project routes
  routes() {
    this._app.use(this._path, require('../routes/objectRecognition.routes'));
  }

  // Listens the connection to create a server
  listen() {
    this._app.listen(this._port, () =>
      console.info(`It running on port ${this._port}`)
    );
  }
}

module.exports = Server;
