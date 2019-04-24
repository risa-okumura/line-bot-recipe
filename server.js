const Hapi = require('hapi');

const init = async()=>{

    
    const server = new Hapi.Server({
        host: 'localhost',
        port: 3000
    });
    
    
    server.route({
        method:'GET',
        path:"/hello",
        handler: (request,h) => {
            return 'hello world';
        }
    });
    await server.start();
    console.log("sever running on %ss");
};
    
    process.on('unhandleRejection',(err)=>{
        console.log(err);
        process.exit(1);
    });
    
    init();