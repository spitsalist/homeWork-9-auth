import express from 'express'
import sequelize from './config/db.js'
import {router} from './router/router.js'

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(router)




app.listen(PORT, async () => {
   try {
    await sequelize.authenticate()
    console.log('conected to database')
    console.log(`Server is running on port ${PORT}`)
   }catch(e){
    console.log('Error connectin to database',e)
   }
})