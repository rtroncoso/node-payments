'use strict';
var async = require('async');

module.exports = function(Payment) {

  Payment.observe('before save', function(ctx, next) {
    var model = ctx.instance;

    async.parallel([
      function updateModel(callback) {
        model.mlId = model.id;
        model.unsetAttribute('id');

        callback();
      },
      function processPayment(callback) {

        var mp = Payment.app.mp;

        mp.getPayment(model.mlId, function(err, data) {
          handlePaymentInfo(err, data, callback, model);
          callback();
        });
      }
    ]);

    next();
  });

  function handlePaymentInfo(err, data, callback, model) {
    if(err) {
      throw new err;
    }

    console.log(data);
    model.updateAll({ id: model.id }, data, function(err, results) {
      if(err) {
        callback(err);
      }

      console.log(results);
    });
  }

};
