const Joi = require('joi');
const mongoose = require('mongoose');

const FrankenSwitchSchema = new mongoose.Schema({
    originalTop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true
    },
    originalBottom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true
    },
    originalStem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Switch',
      required: true
    }
  })

const Switch = mongoose.model('Switch', new mongoose.Schema({
    imageURL: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 127,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['linear','tactile','clicky']
    },
    actuationDistance: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    bottomDistance: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    actuationForce: {
        type: Number,
        required: true,
        min: 0,
        max: 999
    },
    bottomforce: {
        type: Number,
        required: true,
        min: 0,
        max: 999
    },
    pinCount: {
        type: String,
        required: true,
        enum: ['3-Pin','5-Pin']
    },
    manufacturer: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    stemMaterial: {
        type: String,
        required: true,
        enum: ['POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary']
    },
    topMaterial: {
        type: String,
        required: true,
        enum: ['POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary']
    },
    bottomMaterial: {
        type: String,
        required: true,
        enum: ['POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary']
    },
    frankenSwitch: {
        type: FrankenSwitchSchema
    },
    isSilent: {
        type: Boolean,
        required: true
    }

}));

function validateSwitch(switchData) {
    try{
        const schema = Joi.object({
            name: Joi.string().min(1).max(127).required(),
            type: Joi.string().required().valid('linear','tactile','clicky'),
            actuationDistance: Joi.number().required().min(0).max(10), //in millimeters
            bottomDistance: Joi.number().required().min(0).max(10), //in millimeters
            actuationForce: Joi.number().required().min(0).max(999), //in grams
            bottomforce: Joi.number().required().min(0).max(999), //in grams
            pinCount: Joi.string().required().valid('3-Pin','5-Pin'),
            brand: Joi.string().required(),
            manufacturer: Joi.string().required(),
            stemMaterial: Joi.string().required().valid('POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary'),
            topMaterial: Joi.string().required().valid('POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary'),
            bottomMaterial: Joi.string().required().valid('POM','Polycarbonate','Nylon','UHMWPE','Polyamide','ABS','Unknown/Proprietary'),
            isSilent: Joi.bool().required()
            
        });

        return schema.validate(switchData);
        
    } catch (err){
        console.log(err);
    }
}

exports.Switch = Switch; 
exports.validate = validateSwitch;