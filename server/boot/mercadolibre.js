'use strict';
var ML = require('mercadolibre').Meli;

module.exports = function(app) {
  app.ml = new ML(process.env.ML_ID, process.env.ML_SECRET);
};