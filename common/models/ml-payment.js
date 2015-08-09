'use strict';
var async = require('async');

module.exports = function(Payment) {

  Payment.observe('before save', function(ctx, next) {
    var model = ctx.instance;

    async.parallel({
      update: updateModel.bind(null, model),
      process: processPayment.bind(null, model)
    });

    next();
  });

  var updateModel = function(model, cb) {
    model.mlId = model.id;
    model.unsetAttribute('id');

    cb();
  }

  var processPayment = function(model, cb) {
    var mp = Payment.app.mp;

    mp.getPayment(model.mlId, function (err, data) {
      handlePaymentInfo(err, data, cb, model);
      cb();
    });
  }

  function handlePaymentInfo(err, data, cb, model) {
    if(err) {
      throw new err;
    }

    console.log(data.response.collection);
    model.updateAll({ id: model.id }, data.response.collection, function(err, results) {
      if(err) {
        cb(err);
      }

      console.log(results);
    });
  }

};
