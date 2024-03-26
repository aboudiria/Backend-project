const mongoose = require ('mongoose');
const schema = mongoose.schema;
const freindrequestschema= new schema({
 sender:{
    type:schema.type.ObjectId,
    ref:'user',
 },
 receiver:{
    type:schema.type.ObjectId,
    ref:'user',
 },
 requeststatus:{
    type: String,
    default:"pending",
    enum:["pending","accepted","rejected","canceled"],

 },
 {timestamps:true},

});
module.exports=mongoose.model("Freindrequest",freindrequestschema);