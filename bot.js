//hapiバージョン（未使用）

const hapi = require('hapi');
const line = require('@line/bot-sdk');
const request = require('superagent');

const line_config = {
    channelAccessToken:'lop6ek8rM2J17RNlsbL0nUtqsWzUf7lQUqaCcyHnmyEW23J/KokPFau0ctTCw7CWZc+xGvfR3w1JZXVMLR1r4KSISVf2v1B5Sxemrx/bcDpw/z0mHnJcaWuljbP1j+GY3qPI1fRM+VAab/rK89V46QdB04t89/1O/w1cDnyilFU=',
    channelSecret:'ce49f5f6fcc3620528178c57d2c6b48e'
};
const client = new line.Client(config);

const server = new hapi.Server();
server.connection({
    host:'localhost',
    port:'3000'
});

const client = () =>{
    
}
server.register({
    register: require()
})

server.route({
    method: 'POST',
    path: '/node_bot',
    handler:(request,reply)=>{
        request
            .post()
            .send({replyToken: replyToken, messages: sendMessage})
            .set('X-Line-Signature',)
        

    }
})
