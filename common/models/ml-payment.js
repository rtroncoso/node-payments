module.exports = function(Payment) {

  Payment.observe('before save', function processPayment(ctx, next) {
    var model = ctx.instance;
    var mp = Payment.app.mp;

    model.mlId = model.id;
    model.unsetAttribute('id');

    next();
  });

};
