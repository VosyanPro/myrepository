// модель схема для документа коллекции phones базы данных phoneDB

const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
    phoneName: {
        type: String
    },
    price: {
        type: String
    },
    description: {
        type: String
    }
})

mongoose.model('phoneschm', phoneSchema)
