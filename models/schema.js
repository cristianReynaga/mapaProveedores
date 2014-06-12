var db = require('mongoose'),
    schema = new db.Schema();

var Cache = new schema({
    title: {type: String, index: true}
    , slug : {type: String, lowercase: true, trim: true}
});


var Univer = new shcema({
    nombre : {type: String},
    ubicacion : {type: String}
});