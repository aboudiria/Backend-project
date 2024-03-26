const mongoose = require ('mongoose');
const schema = mongoose.schema;
const commentschema= new schema({
    CommentOwner : {
        type : schema.types.ObjectID,
        ref : 'user',
    },
    parentPost : {
        type: schema.types.ObjectID,
        ref :'post',
    },
    content :{
        default: "",
        maxlength:400,

    },
},
{Timetapms:true}
);
model.exports = mongoose.model("comment", commentSchema);