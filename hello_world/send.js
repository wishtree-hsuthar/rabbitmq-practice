let amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connectionError, connection) => {
    if(connectionError){
        throw connectionError
    }
    console.log('Connection Established')

    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }

        let queue = 'temp_queue';
        let msg = 'Hello World!'

        channel.assertQueue(queue, {
            durable: false
        })

        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(' [x] Sent %s', msg)
    })

    setTimeout(function() {
        connection.close();
        process.exit(0)
    }, 500);
})