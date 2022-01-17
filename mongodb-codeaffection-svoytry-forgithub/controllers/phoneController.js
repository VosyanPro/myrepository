//

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Phone = mongoose.model('phoneschm')

router.get('/', (req, res) => {
    res.render("phone/addOrEdit", {
        viewTitle: "Добавление телефона"
    })
})

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res)
    else
        updateRecord(req, res)
})

function insertRecord(req, res) {
    const phone = new Phone()
    phone.phoneName = req.body.phoneName
    phone.price = req.body.price
    phone.description = req.body.description
    phone.save((err, doc) => {
        if (!err)
            res.redirect('/addOrEdit/phones')
        else {
            console.log('Error during record insertion : ' + err)
        }
    })
}

function updateRecord(req, res) {
    Phone.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('addOrEdit/phones') }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body)
                res.render("phone/addOrEdit", {
                    viewTitle: 'Редактирование',
                    phone: req.body
                })
            }
            else
                console.log('Error during record update : ' + err)
        }
    })
}

router.get('/phones', (req, res) => {
    Phone.find((err, docs) => {
        if (!err) {
            res.render("phone/phones", {
                phones: docs.map(doc => doc.toJSON())  //тут поменять на комент с ютуба  list: docs.map(doc => doc.toJSON())
            })
        }
        else {
            console.log('Error in phones list :' + err)
        }
    })
})

router.get('/:id', (req, res) => {
    Phone.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("phone/addOrEdit", {
                viewTitle: "Редактирование",
                phone: doc.toJSON()
            })
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Phone.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/addOrEdit/phones')
        }
        else {
            console.log('Error in phone delete : ' + err)
        }
    })
})

module.exports = router