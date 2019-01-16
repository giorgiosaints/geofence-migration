const mongoose = require('mongoose')
const config = require('config')
const { ControlPoint } = require('./models/control_points.model.new')

const migration = async () => {
    try {
        mongoose.connect(config.get('db.url'), { useNewUrlParser: true })
            .then(() => console.log('Connected to MongoDB'))

        const control_points = await ControlPoint.find({})

        const cps = await Promise.all(
            control_points.map(async cp => {
                await ControlPoint.updateOne({ _id: cp._id }, { $set: { 'geofence.radius': 330, 'geofence.type': 'c', 'geofence.coordinates': [{ lat: cp.lat, lng: cp.lng }] }, $unset: { lat: "", lng: "" } })
                console.log("​migration -> cp", cp)
            })
        )
            
        console.log("​migration -> cps", cps)
        
    } catch (error) {
		console.log("​catch -> error", error)
    }

    
}

migration()