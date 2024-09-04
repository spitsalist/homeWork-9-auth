import { User } from '../models/user.js';

export function checkPassword(req, res, next){
    if(!req.user) {
        return res.status(401).json({message: 'Unknow user'})
    }
    if(req.user.mustChangePassword) {
        return res.status(401).json({message: 'User must change password'})
    }
    next()
}

export function checkAdminRole(req, res, next) {
    req.user = {role: 'admin'}
    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Only admins can access this route' })
        }
        next()
        }