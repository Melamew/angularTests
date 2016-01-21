var fs = require("fs");
var file = __dirname + "\\" + "config.json";
var express = require("express");
var app = express();

var config;
var server;

setupSite = function(db){

    app.put("/image", function(request, response){

    });

    app.get("/listImages", function (request, response){
        var collection = db.collection("images");
        var images = collection.find({});
        if (!images) response.end("{}");
        else response.end(JSON.stringify(images));
    });

    app.get("/siteConfig", function(request, response){
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