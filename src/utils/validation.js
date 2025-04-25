const validator=require('validator')
const validateSignupData=(req)=>{

    const {firstName,lastName,emailId,password}=req.body
    if(!firstName||!lastName){
        throw new Error("Invalid name")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong, please enter a strong password.")
    }

}
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","gender","age","about","skills"
    ]
    const isEditAllowed=Object.keys(req.body).every(field=>allowedEditFields.includes(field));
    if(req.emailId&&!validator.isEmail(req.emailId)){
        throw new Error("Enter a valid email Id")

    }
   
    return isEditAllowed
}

module.exports={validateSignupData,validateEditProfileData}