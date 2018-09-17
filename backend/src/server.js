// server.js

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const port     = 8080;
const path     = require("path");
const mongoOp  =   require("./models/mongo");
const router   =   express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://172.11.0.4:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname+'/test.html'));
});

//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/users")
  .get(function(req,res){
    let response = {};
    mongoOp.find({}, (err,data) => {
      // Mongo command to fetch all data from collection.
      if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
      } else {
        response = {"error" : false,"message" : data};
      }
      res.json(response);
    });
  });

app.use('/',router);

app.listen(port, function () {
  console.log('Example app listening on port '+ port +'!');
});
