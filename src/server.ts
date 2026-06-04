import express from 'express'
import { config } from '#config/config.js'
const app = express()
const server = app.listen(config.port, ()=>{
    console.log(`the server is listening on port ${config.port}`)
})