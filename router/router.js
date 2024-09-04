import {User} from '../models/user.js'
import bcrypt from 'bcrypt'
import Router from 'express'
import {checkPassword, checkAdminRole} from '../middlewares/middlewares.js'

export const router = new Router()

router.post('/register', async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({where: {email}})
        if (existUser) {
            return res.status(400).json({message: 'Email already exist'})
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({email, password: hashedPassword})
            console.log('User created succesfully:', newUser)
            res.status(201).json({message: 'User succesfuly created'})
    }catch(e){
        res.status(500).json({ message: 'Error creating user' })
    }
})



router.post('/change-password', async (req, res) => {
    const {userId, newPassword} = req.body
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword
            user.mustChangePassword = false

            await user.save()
            res.status(200).json({message: 'Password changed'})
    }catch(e){
        res.status(500).json({ message: 'Error on changing password' })

    }
})

router.delete('/delete-account', async (req, res) => {
    const {userId, password} = req.body
    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) {
                return res.status(400).json({message: 'Invalid password'})
                }
                await user.destroy()
                res.status(200).json({message: 'Account deleted'})
                }catch(e){
                    res.status(500).json({ message: 'Error deleting account' })
                    }
})


        router.get('/admin', checkAdminRole, checkPassword, (req, res) => {
            res.status(200).json({message: 'welcome in panel administration'})
        })

        router.post('/change-email', async (req, res) => {
            const {userId, currentPassword, newEmail} = req.body
            try {
                const user = await User.findByPk(userId)
                if (!user) {
                    return res.status(404).json({ message: 'User not found' })
                    }
                    const isValidPassword = await bcrypt.compare(currentPassword, user.password)
                    if (!isValidPassword) {
                        return res.status(400).json({message: 'Invalid password'})
                        }
                        const emailExist = await User.findOne({where: {email: newEmail}})
                        if (emailExist) {
                            return res.status(400).json({message: 'Email already exist'})
                            }
                            user.email = newEmail
                            await user.save()
                            res.status(200).json({message: 'Email changed'})
                            }catch(e){
                                res.status(500).json({ message: 'Error on changing email' })
                                }
        })
