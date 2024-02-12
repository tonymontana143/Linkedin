const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")

router.post('/registration',
[
    check('username',"nickname cant be empty").notEmpty(),
    check('password', "password must contain 4-10 symbols").isLength({min:4, max:10}),
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router
