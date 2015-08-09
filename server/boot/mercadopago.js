'use strict';
var MP = require('mercadopago');

module.exports = function(app) {
  app.mp = new MP(process.env.MP_ID, process.env.MP_SECRET);

  if(process.env.MP_SANDBOX) {
    app.mp.sandboxMode(true);
  }

  app.mp.getAccessToken()
    .then(function(accessToken) {
      app.mp.accessToken = accessToken;
      console.log('Successfully initialized MP in app');
    }, function(err) {
      console.log('Unhandled MP error: ' + err.message);
    });

  app.use('/sandbox', function(req, res) {
    var preference = {
      "items": [
        {
          "title": "Test",
          "quantity": 1,
          "currency_id": "USD",
          "unit_price": 10.5
        }
      ]
    };

    // Sandbox preference point
    app.mp.createPreference(preference).then(function(data) {
      if(data.status === 201) {
        res.redirect(data.response.sandbox_init_point);
      }
    }, function(err) {
      throw new err;
    });
  });
};