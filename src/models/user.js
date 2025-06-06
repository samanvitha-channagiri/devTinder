const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
//defining the schema
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,

    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address  "+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password "+value)
            }
        }

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        enum:{
            values:['male','female','others'],
            message:`{VALUE} is not a valid gender type`
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // }
        

    },photoUrl:{
        type:String,
        default:"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url  "+value)

            }
        }

    },about:{
        type:String,
        default:"This is the default about of the user"
    },skills:{
        type:[String],
    }
},{
    timestamps:true
});

userSchema.methods.getJWT=async function(){
    const user=this
 const token=  await jwt.sign({_id:user._id},"DEV@Tinder$790",{expiresIn:"1d"});
 return token;
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user =this
    const passwordHash=this.password
   const isPasswordValid=  bcrypt.compare(passwordInputByUser, passwordHash);
     return isPasswordValid
}
module.exports=mongoose.model("User",userSchema); //in mongodb it'll become users

//OR const User=mongoose.model("User",userSchema);//creating the user model.. 

// module.exports=User;