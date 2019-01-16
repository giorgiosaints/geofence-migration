const mongoose = require('mongoose')

const controlPointSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    duns: {
        type: String,
        minlength: 2,
        maxlength: 100,
    },
    lat: {
        type: Number,
        min: -90,
        max: 90,
        default: 0
    },
    lng: {
        type: Number,
        min: -180,
        max: 180,
        default: 0
    },
    full_address: {
        type: String,
        minlength: 5,
        maxlength: 150
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now

    },
    update_at: {
        type: Date,
        default: Date.now
    }
})

controlPointSchema.statics.findByName = function (name, projection = '') {
    return this.findOne({ name }, projection)
}

const update_updated_at_middleware = function (next) {
    let update = this.getUpdate()
    update.update_at = new Date()
    next()
}

controlPointSchema.pre('update', update_updated_at_middleware)
controlPointSchema.pre('findOneAndUpdate', update_updated_at_middleware)

const ControlPoint = mongoose.model('ControlPoint', controlPointSchema)

exports.ControlPoint = ControlPoint
exports.controlPointSchema = controlPointSchema