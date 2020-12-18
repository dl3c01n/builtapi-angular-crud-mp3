let express = require('express');
let path = require('path');
let mongoose = require('mongoose');
let cors = require('cors')
let bodyParser = require('body-parser');
let dbConfig = require('./db/database');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Database connectée')
},
error => {
    console.log('Database non connectée')
}
)

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

const userRoute = require('./routes/videos_routes');
app.use('/endpoint', userRoute);

const port = 8080;

const server = app.listen(port, () => {
    console.log('Listenning on port : ' + port)
})

app.get('/', (req, res) => {
    res.send('Invalid endpoint')
})

app.use((err, req, res, next) => {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})

app.use(express.static(path.join(__dirname, 'dist')));