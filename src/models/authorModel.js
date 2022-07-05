const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema( {
     fname: { 
        type: String,
        require: true,
        trim:true
    },
     lname: {
        type: String,
        require: true,
        trim:true
     },
      title: {
        type: String,
        require: true,
        enum: ["Mr", "Mrs", "Miss"],
        trim:true
    },
       email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        // 'valid email': [validateEmail, 'Please fill a valid email address'],
        trim: true
                                                
    },
                         
    password: {
        type: String,
        require: true,
        trim: true
    }, 
    
 }, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)

 // let checkEmail = validator.validate(email)
    // if (!checkEmail) {
    //     return res.status(400).send({ status: false, msg: "please enter the email address properly " })
    // }
    // if (!password) {
    //     return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Password" })
    // }

    // let schema = new passwordValidator();
    // schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123', 'mypassword']);
    // let checkPassword = schema.validate(password)


    // if (checkPassword === false) {
    //     return res.status(400).send({ status: false, msg: "password should have min 8 character + one Uppercase + one lowercase + min 2 digits + should not have any space + should not be one of these : Passw0rd, Password123,mypassword" })
    // }