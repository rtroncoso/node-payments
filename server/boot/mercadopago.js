'use strict';

var MP = require('mercadopago');

module.exports = function(app) {
  app.mp = new MP(process.env.MP_ID, process.env.MP_SECRET);

  var at = app.mp.getAccessToken()
    .then(function(accessToken) {
      app.mp.accessToken = accessToken;
      console.log('Successfully injected MercadoPago credentials in app');
    }, function(err) {
      console.log('Unhandled MP error: ' + err.message);
    });
};