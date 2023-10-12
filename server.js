const express = require('express')
const server = express()
const driversRouter = require('./api/driversRouter.js')

server.use(express.json())
server.use('/drivers', driversRouter)

module.exports = server
