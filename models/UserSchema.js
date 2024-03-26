const mongoose = require ('mongoose');
const schema = mongoose.schema;
const bcrypt= require('bcrypt');

const userSchema = new schema({
    first_name: {
        type : String, 
        required : [true, "the first name is required"],
        trim : true, 
        minlenght : 3,
        maxlength : 50,
    },
    last_name: {
        type : String, 
        required : [true, "the first name is required"],
        trim : true, 
        minlenght : 3,
        maxlength : 50,
    },
    username:{
        type : String,
        requied: [true,"this user name is required"],
        unique: true,
        maxlength: 20,
        minlenght: 5,
        trm: true,
    },
    email:{
        type:String,
        unique:true,
        maxlength:150,
        lowercase:true,

    },
    phone_number:{
        type: String,
        unique: true,
        trim: true,
        required: [true, "this phone is required"],
        maxlength: 20,
    },
    profile_picture: {
        type: string,
        unique: true,
        default: "",
    },
    password: {
        type: string,
        trim: true,
        minlenght: 8,
    },
    passwordconfirm: {
        type: string,
        trim: true,
        minlenght: 8,
    },
    passwordChangedAt : Date,
    friends: [{
        type: schema.Types.ObjectId,
        ref: "user",
      },
     ],
     followers : [{
        type: schema.type.ObjectId,
        ref : "user",

     },],
     following : [{
        type: schema.type.ObjectId,
        ref : "user",
     },
    ],
},
{timestamps:true}

);
userSchema.pre("save",async function(next){
    try {
     if(!this.isModified("password")){
        return next();
     }
     this.password= await bcrypt.hash(this.password, 12);
     this.passwordconfirm= undefined;
     
        
    } catch (err) 
    {
        console.log(err);    
    }

}
UserSchema.methods.checkPassword= async function(condidatePassword,userPassword){
    // condidate password :coming from frontend
    //userPassword:the hashed saved password coming from db
    
    return awit bcrypt.compare(condidatePassword,userPassword)
    }
    );
module.exports = mongoose.model("User",userschema,)
