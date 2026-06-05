import path from 'path'
import fs from 'fs'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import { config } from '#config/config.js'

const { combine, timestamp, json } = winston.format
// recursive:- create all folders in the path, not just the last one
const logDirectory = path.resolve(process.cwd(), 'logs')
if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory, {recursive:true})
}


const consoleTransport = new winston.transports.Console({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
})

const developmentFileRotateTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: 'app-info-%DATE%.log',
  level: 'info',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  maxSize: '10m'
})

const productionFileRotateTransport = new DailyRotateFile({
  dirname: logDirectory,
  filename: 'app-error-%DATE%.log',
  level: 'error',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  maxSize: '5m'
})

const transports: winston.transport[] = [consoleTransport]
if (config.nodeEnv !== 'production') {
  transports.push(developmentFileRotateTransport)
}
transports.push(productionFileRotateTransport)

transports.forEach((tranport)=>{
    tranport.on('error', (error)=>{
        console.error('Logger transport error', error)
    })
})
export const logger = winston.createLogger({
  defaultMeta: { service: 'Connector application' },
  format: combine(timestamp(), json()),
  transports,
  exitOnError: false,
  exceptionHandlers: [
    new winston.transports.File({ filename: path.join(logDirectory, 'exception.log') })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: path.join(logDirectory, 'rejection.log') })
  ]



    
})