const express = require('express')
const { mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const Card = require('../models/CardSchema')
const User = require('../models/UserSchema')
const bcrypt = require('bcrypt')

const router = express.Router()

//functions
const  maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.code, { expiresIn: maxAge });
}

//middleware
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.code, async (err, decodedToken) => {
            if(err) {
                res.redirect('/login')
            }
            else {
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next();
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

//routes - login
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the user's password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword, // Store the hashed password
        });

        // Save the new user to the database
        await newUser.save();

        // Optionally, you can create and send an access token as a response
        const accessToken = createToken(newUser._id); // Assuming you have a createToken function

        res.status(201).json({ message: 'User registered successfully', accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    const {username, password} = req.body
    console.log('token cannot exist')
    try {
        const user = await User.find({ username: req.body })
        if(!user) {
            return res.status(400).json({ errors: { msg: "User not found/" } })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({ errors : [{ msg : "password is invalid" }] })
        }
        const accessToken = createToken({username})

        res.status(201).json({accessToken : accessToken})
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
})

//routes - tasks
router.get('/tasks', async (req, res) => {
    const tasks = await Card.find()
    res.status(200).json(tasks)
})

router.get('/count', async (req, res) => {
    try {
        const achievements = await Card.find({ "status" : 4 })
        console.log('count', achievements)
        res.status(200).json(achievements)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post('/', async (req, res) => {
    const { username, title, description, status } = req.body

    try {
        const task = await Card.create({username, title, description, status})
        console.log(username, title, description, status)
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.patch('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await Card.findByIdAndUpdate({_id: id}, {
            ...req.body
        })
        if(!task) {
            console.log('esxdcfgvhbjnk')
            res.status(404).json({ error: 'no such task in db' })
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const task = await Card.findByIdAndDelete(id)
    if(!task) {
        return res.status(404).json({"msg" : "task not found"})
    }
    res.status(200).json(task)
})

module.exports = router