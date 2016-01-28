var fs = require("fs");
var file = __dirname + "\\" + "config.json";
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json({
    limit: '5MB'
}));
app.use(cors());
var config;
var server;

setupSite = function(db){

    app.put("/image", cors(), function(request, response){
        
    });

    app.get("/listImages", cors(), function (request, response){
        console.log("listImages: ");
        var collection = db.collection("images");
        var images = collection.find({});
        if (!images || undefined == images.length) {
            console.log("No images in database");
            response.end("[]");
        } else {
            console.log("found " + images.length + " images");
            response.end(JSON.stringify(images));
        }
    });
    
    app.post("/image", cors(), function(request, response) {
        console.log("Post Image: ");
        console.log(request.headers);
        console.log(request.body);
    });

    app.get("/siteConfig", cors(), function(request, response){
        response.end("NOOP");
    });
}

setupDatabase = function(){
    if (!config) throw "No config :("
    var mongoClient = require("mongodb").MongoClient;
    var url = "mongodb://" + config.mongo_server + ":" + config.mongo_port + "/melsServer";
    console.log("Mongo path: " + url);
    mongoClient.connect(url, function(err, db)
    {
        if (err) throw err;
        console.log("Connected to database");
        setupSite(db);
    });
}

runServer = function () {
    if (!config) throw "No config :(";
    server = app.listen(config.listen_port, setupDatabase);
};

fs.readFile(file, 'utf8', function (err, data){
    if (err) throw err;
    config = JSON.parse(data);
    console.log(config);
    runServer(config);
});