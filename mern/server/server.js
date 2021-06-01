import path from 'path'
import express from 'express'
import template from './../template'
import { MongoClient } from 'mongodb'
//development mode
import devBundle from './devBundle'

const app = express()
//development mode:
devBundle.compile(app)

// Serving static Files from dist folder
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// When the server receives a request at the root URL /,we'll render template.js 
app.get('/', (req, res) => {
    res.status(200).send(template())
})

// configure express to listen to an specific port
let port = process.env.PORT || 3000
app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Server started at port %s', port)
})

// conect to mongo DB
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/mernInicialSetup'
MongoClient.connect(url, (err, db) => {
    console.log("Connected Succesfully to mongodb server")
    db.close()
})