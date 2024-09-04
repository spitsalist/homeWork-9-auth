import { Sequelize } from "sequelize";
import config from './config.json' assert { type: 'json' }

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

if(!dbConfig) {
    throw new Error(`No database config found for environment: ${env}`)
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
})

// sequelize.authenticate()
// .then(() => {
//     console.log('connected to database')
//     })
//     .catch(err => {
//         console.error('error connecting to database:', err)
//         })
export default sequelize