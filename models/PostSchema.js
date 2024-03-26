const mongoose = require ('mongoose');
const schema = mongoose.schema;
const PostSchema = new schema({
    PostOwner :{
        type: schema.Types.ObjectId,
        ref: "User",
        required: true,


    },
    img:{
         type: String,
         default : "",
         required:true
    },
    caption:{
        type :String,
        default :"",
        maxlength: 250,
        required:true,

    },
    content: {
        type : String,
        default : "",
        maxlength: 1000,
        required: true,

    },
    video : {
        type: String,
        default : "",
   },
   likes : [
    {
        type: schema.types.ObjectId,
        ref: "user",
    },
   ],
   Comments : [{
    type: schema.types.ObjectId,
    ref: "comment",
   },],
    },

},
 {timesTamps:true},);
 module.exports = mongoose.model("Post",PostSchema)
