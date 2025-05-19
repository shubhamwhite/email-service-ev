const startEmailConsumer = require('./src/consumers/email.consumer');

startEmailConsumer().then(() => {
  console.log('Email Service running - listening to RabbitMQ...');
});