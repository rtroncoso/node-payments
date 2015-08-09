module.exports = function(Payment) {

  Payment.observe('before save', function(ctx, next) {
    var model = ctx.instance;
    model.mlId = model.id;
    model.unsetAttribute('id');

    processPayment(model);
    next();
  });

  function processPayment(model) {
    var mp = Payment.app.mp;

    mp.getPayment(model.mlId, function(err, data) {
      if(err) {
        throw new err;
      }

      console.log(data);
      module.updateAll({ id: model.id }, data, function(err, results) {
        if(err) {
          throw new err;
        }

        console.log(results);
      });
    });
  }

};
