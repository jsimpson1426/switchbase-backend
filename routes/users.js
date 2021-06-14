const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const users = await User.find().sort('name');
    res.send(users);
});

router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('User not found.');

    res.send(user);
});

router.post('/', async (req,res) => {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    })

    user = await user.save();

    res.send(user);

});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const user = await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role
    }, { new: true});
  
    if (!user) return res.status(404).send('User not found.');
    
    res.send(user);
  });

router.delete('/:id', async (req,res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if(!user) return res.status(404).send('User not found.');

    res.send(user);
});

module.exports = router;