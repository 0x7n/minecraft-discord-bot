const mongoose = require('mongoose')
const coordsSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    coords: mongoose.SchemaTypes.String,
});

module.exports = mongoose.model("Coords", coordsSchema)