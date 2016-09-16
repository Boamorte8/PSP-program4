let express = require('express');
const path = require('path');
let app = express();
// let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let statistic = require('./controllers/routes/statistic');
let config = require('config'); //we load the db location from the JSON files
var multer  = require('multer');
var upload = multer();

let root = path.normalize(__dirname + '/..');

//db options
// let options = {
//                 server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
//                 replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }
//               };
// mongoose.connect(config.DBHost, options);
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.set('appPath', path.join(root, 'client'));
app.use(express.static(app.get('appPath')));
app.set('views', root + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.route('/*')
  .get((req, res) => {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });

app.route("/statistics/calculate").post(upload.single('data'),statistic.getRanges);
    // .post(book.postBook);
// app.route("/book/:id")
//     .get(book.getBook)
//     .delete(book.deleteBook)
//     .put(book.updateBook);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing
