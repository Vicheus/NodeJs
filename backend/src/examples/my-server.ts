// server.js

// set up ======================================================================
// get all the tools we need
import * as express from 'express';
const app      = express();
const port     = 8090;
const path     = require("path");
const router   =   express.Router();

import {User} from '../models/mongo';

console.log(__dirname);
console.log(path.dirname(__filename));
// console.log(__filename);
// console.log('------------------------------------------');
// console.log(module);
// console.log('------------------------------------------');
// console.log(exports);
// console.log('------------------------------------------');
// console.log(require);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname+'/test.html'));
});

// process.nextTick((a) => {
//     console.log(a);
// }, 'nextTick callback');
// console.log('initialLog');
// setTimeout(() => {
//     console.log('setTimeout callback')
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate callback')
// });
//route() will allow you to use same path for different HTTP operation.
//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.

router.route("/users")
  .get(function(req,res){
    let response = {};
    User.find({}, (err,data) => {
      // Mongo command to fetch all data from collection.
      if(err) {
        response = {"error" : true, "message": "Error fetching data"};
      } else {
        response = {"error" : false, "message": data};
      }
      res.json(response);
    });
  });

app.use('/',router);

app.listen(port, function () {
  console.log('Example app listening on port '+ port +'!');
});
