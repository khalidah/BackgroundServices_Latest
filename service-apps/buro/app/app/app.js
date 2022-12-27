const { spawn } = require('child_process');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const hbs = exphbs.create({defaultLayout:'main',extname:'hbs'});

const publicPath = path.join(__dirname,'./views');

app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');
app.use('/', express.static(publicPath));
app.get('/',(req,res,next)=>{
    res.render('home');
});
const server = app.listen(8080,()=>{
    console.log('App Server started')
});

const io = socketio(server);
io.on('connection', socket=> {
    console.log("connected");
    let i=0;
    socket.on('buro-status',data=> {
        const tail = spawn('journalctl',['-u','buro-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('buro-south-status',data=> {
        const tail = spawn('journalctl',['-u','buro-south-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-south',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('buro-north-status',data=> {
        const tail = spawn('journalctl',['-u','buro-north-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-north',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('dsk-status',data=> {
        const tail = spawn('journalctl',['-u','dsk-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-dsk',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('verc-status',data=> {
        const tail = spawn('journalctl',['-u','verc-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-verc',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('addin-status',data=> {
        const tail = spawn('journalctl',['-u','addin-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-addin',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('bfk-status',data=> {
        const tail = spawn('journalctl',['-u','bfk-tab-collection.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-bfk',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });

    socket.on('buro-daily',data=> {
        console.log('here');
        const tail = spawn('journalctl',['-u','buro-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('buro-south-daily',data=> {
        const tail = spawn('journalctl',['-u','buro-south-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-south-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('buro-north-daily',data=> {
        const tail = spawn('journalctl',['-u','buro-north-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-north-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('dsk-daily',data=> {
        const tail = spawn('journalctl',['-u','dsk-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-dsk-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('verc-daily',data=> {
        const tail = spawn('journalctl',['-u','verc-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-verc-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('addin-daily',data=> {
        const tail = spawn('journalctl',['-u','addin-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-addin-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('bkf-daily',data=> {
        const tail = spawn('journalctl',['-u','bfk-daily-process.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-bkf-daily',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });

    socket.on('buro-bkash',data=> {
        const tail = spawn('journalctl',['-u','buro-bkash.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-bkash',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });

    socket.on('buro-south-bkash',data=> {
        const tail = spawn('journalctl',['-u','buro-south-bkash.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-south-bkash',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });

    socket.on('buro-north-bkash',data=> {
        const tail = spawn('journalctl',['-u','buro-north-bkash.service','-f']);
        tail.stdout.on('data',function(data){
            socket.emit('res-buro-north-bkash',data.toString());
        });
        tail.on('exit',function(code){
            console.log('child process exited with code '+toString());
        });
        
    });
    socket.on('end',()=>{
        console.log("Disconnected");
        socket.disconnect();
    });
});
