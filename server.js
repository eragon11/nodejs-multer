import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import http from 'http';
import imageRouter from './imageUpload/img.route';

// Express Setup 
const app = express();

const server = http.createServer(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use(morgan('combined', { stream: winston.stream }));

// MongoDB config
let mongoUrl = 'mongodb+srv://eragon:lbW3K3DzfFIXZ0kf@cluster0-kysrb.mongodb.net/test?retryWrites=true&w=majority';
// let _db;
mongoose.connect(mongoUrl, { poolSize: 20, useNewUrlParser: true }, function (err, client) {
    // _db = client.db("iotmeetdb");
    console.log("Successfully connected to Database: " + mongoUrl);
});

mongoose.Promise = Promise;

mongoose.connection.on("error", (error) => {
    console.log("Mongoose connection error : ", JSON.stringify(error), () => {
        /* On mongo connection error, exit from running server */
        process.exit(0);
    });
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection disconnected : ", new Date());
    // Logger.error("Mongoose connection disconnected : ", new Date());
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

//optimization
app.use('/image', imageRouter);

const port = "3001";
app.set("port", port);


function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            //Logger.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            // Logger.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}


server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onListening() {
    const addr = server ? server.address() : {};
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.table([["server", "started"], ["port", port]]);
}

export default app;