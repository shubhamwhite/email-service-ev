const color = require('./src/helper/color.helper')

const startEmailConsumer = require('./src/consumers/email.consumer')

startEmailConsumer().then(() => {
  color.success('Email Service running - listening to RabbitMQ...')
})
