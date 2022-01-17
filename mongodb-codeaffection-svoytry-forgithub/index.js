//запуск сервера app.listen

require ('./models/db')

const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const bodyparser = require('body-parser')

const phoneController = require('./controllers/phoneController') //

const app = express()
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())

app.set('views', path.join(__dirname, '/views/'))
app.engine('hbs', exphbs.engine(
    {
        extname: 'hbs',
        defaultLayout: 'mainLayout',
        layoutsDir: __dirname + '/views/layouts/'
    })
)
app.set('view engine', 'hbs')


app.listen(3000, () => {
    console.log('Express server started at port : 3000')
})

app.use('/addOrEdit', phoneController) //в ' ' название страницы например '/' или '/phones' base URL


