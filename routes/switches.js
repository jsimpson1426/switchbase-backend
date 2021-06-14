const {Switch, validate} = require('../models/switch');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const url = require('url');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
const upload = multer({storage: storage}).single('imageFile');

router.get('/new', (req,res) => {
    res.render('switches');
});

router.get('/edit/:id', async (req,res) => {
    const switchData = await Switch.findById(req.params.id);
    res.render('switches', {data: switchData});
});

router.get('/', async (req,res) => {
    const switches = await Switch.find().sort('name');
    res.send(switches);
});

router.get('/:id', async (req,res) => {
    const switchData = await Switch.findById(req.params.id);
    if(!switchData) return res.status(404).send('Switch not found.');

    res.send(switchData);
});

router.post('/upload', async (req,res) => {

    const {error} = validate(req.body);
    if(error) return res.send(req.body);

    upload(req, res, async (err) => {
        if(err){
            res.send(req.body);
        } else {
            try{
                let switchData = new Switch({
                    imageURL: (req.get('host') + '/images/' + req.file.filename),
                    name: req.body.name,
                    type: req.body.type,
                    actuationDistance: parseFloat(req.body.actuationDistance),
                    bottomDistance: parseFloat(req.body.bottomDistance),
                    actuationForce: parseInt(req.body.actuationForce),
                    bottomForce: parseInt(req.body.bottomForce),
                    mountingType: req.body.mountingType,
                    manufacturer: req.body.manufacturer,
                    brand: req.body.brand,
                    stemMaterial: req.body.stemMaterial,
                    topMaterial: req.body.topMaterial,
                    bottomMaterial: req.body.bottomMaterial,
                    frankenSwitch: req.body.frankenSwitch,
                    isSilent: req.body.isSilent === "yes" ? true : false
                })
            
                switchData = await switchData.save();
            
                res.send(switchData);
            } catch (err){
                res.status(400).send("Error occured while posting.");
            }
            
        }
    });

    

});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const switchData = await Switch.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        actuationDistance: req.body.actuationDistance,
        bottomDistance: req.body.bottomDistance,
        actuationForce: req.body.actuationForce,
        bottomForce: req.body.bottomForce,
        mountingType: req.body.mountingType,
        manufacturer: req.body.manufacturer,
        brand: req.body.brand,
        stemMaterial: req.body.stemMaterial,
        topMaterial: req.body.topMaterial,
        bottomMaterial: req.body.bottomMaterial,
        frankenSwitch: req.body.frankenSwitch,
        isSilent: req.body.isSilent
    }, { new: true});
  
    if (!switchData) return res.status(404).send('Switch not found.');
    
    res.send(genre);
  });

router.delete('/:id', async (req,res) => {
    const switchData = await Switch.findByIdAndRemove(req.params.id);

    if(!switchData) return res.status(404).send('Switch not found.');

    res.send(switchData);
});

module.exports = router;