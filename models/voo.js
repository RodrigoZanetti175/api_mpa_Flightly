const mongoose = require('mongoose');

const VooSchema = new mongoose.Schema({
    companhia:{
        type:String,
        required:true
    },
    aeroportoIda:{
        type:String,
        required:true
    },
    aeroportoVolta:String,
    dataIda:{
        type:Date, 
        required:true
    },
    dataVolta:Date,
    horaIda:{
        type:String,
        required:true
    },
    horaVolta:String
});

const Voo = mongoose.model('Voo', VooSchema);

module.exports = Voo;