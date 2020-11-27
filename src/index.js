const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/mevn-database', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(db => console.log('Db is connected'))
    .catch(err => console.error(err))

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/tasks', require('./routes/tasks'));

app.use(express.static(__dirname + 'public'));

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
