// база данных connect + использование модели здесь

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/phoneDB', { useNewUrlParser: true }, (err) =>
    {
    if (!err)
    {console.log('MongoDB connection succeeded')}
    else
    {console.log('Error in DB connection : ' + err)}
})

require('./phone.model')