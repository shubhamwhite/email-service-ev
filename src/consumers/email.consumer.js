const amqp = require('amqplib')
const sendOtpToEmail = require('../service/emailProvider')

async function startEmailConsumer() {
  const connection = await amqp.connect('amqp://127.0.0.1')
  const channel = await connection.createChannel()
  await channel.assertQueue('emailQueue')

  console.log('Email Service: Waiting for messages...')

  channel.consume('emailQueue', async (msg) => {
    if (msg !== null) {
      try {
        const { email, otp, name, flag } = JSON.parse(msg.content.toString())
        await sendOtpToEmail(email, otp, name, flag)
        channel.ack(msg)
        console.log(`Email sent to: ${email}`)
      } catch (error) {
        console.error('Error processing email job:', error.message)
        channel.nack(msg, false, false) // discard message
      }
    }
  })
}

module.exports = startEmailConsumer
