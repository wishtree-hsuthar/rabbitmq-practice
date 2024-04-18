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

        // checking the existence of the queue before using it=
        channel.assertQueue(queue, {
            durable: false
        });


        channel.consume(queue, (msg) => {
            let secs = msg.content.toString().split('.').length - 1;

            setTimeout(() => {
                console.log('[x] done')
                channel.ack(msg)
            }, secs * 1000);
        }, { noAck: false })

    })
})