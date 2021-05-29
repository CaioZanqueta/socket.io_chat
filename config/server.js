/** Importar os módulos */
const express = require('express')
const consign = require('consign')
const expressValidator = require('express-validator')

/** Iniciar o express */

const app = express()

/** Setar as variáveis de view do express */

app.set('view engine', 'ejs')
app.set('views', './app/views')

/** Configurar os middleware */

app.use(express.static('./app/public'))
app.use(express.urlencoded({ extended: true }))
app.use(expressValidator())

/** Efetua o autoload das rotas para o app */

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

module.exports = app