const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connectionError, connection) => {

    if(connectionError){
        throw connectionError
    }

    connection.createChannel((channelError, channel) => {

        if(channelError){
            throw channelError
        }

        let queue = 'worker_queue'
        let message = process.argv.slice(2).join(' ') || 'This is the message!'

        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message), {
            persistent: true
        })

        console.log(" [x] Sent '%s'", message);
    })
})