const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError){
        throw connectionError
    }

    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError
        }

        let queue = "temp_queue"

        channel.assertQueue(queue, {
            durable: false
        })

        channel.consume(queue, (msg) => {
            console.log(" [x] Received %s", msg.content.toString())
        }, { noAck: true });

        
    })
})