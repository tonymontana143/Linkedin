const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')


const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}


class authController{

    async registration(req, res){
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "registration error", errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate){
                return res.status(400).json({message: "This nickname is busy"})
            }
            const coins = 0
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value], bestResult: coins})
            await user.save()
            return res.json({message: "User sucsessfully registered"})
        }catch(e){
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user){
                return res.status(400).json({message: `User ${username} is not in database` })
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                return res.status(400).json({message: `username or password is incorrect` })
            }
            const token = generateAccessToken(user._id,user.roles)
            return res.json({token})

        }catch(e){
            console.log(e)
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res){
        try {
            const users = await User.find().select('username bestResult').sort({bestResult: -1}).limit(10);
            res.json(users);
        } catch(e) {
            console.log(e);
        }
    }
    
}

module.exports = new authController()