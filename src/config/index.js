const dotenv = require('dotenv')

dotenv.config()

const env = process.env.NODE_ENV || 'development'
const configFile = `./options/${env}.js`

console.log(`Loading config from ${configFile}`)

const config = require(configFile)

module.exports = config