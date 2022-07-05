const authorModel = require('../models/authorModel')
const validator = require('email-validator')
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');

const createAuthor = async function (req, res) {

    try {
        const authordata = req.body

        const { fname, lname, title, email, password } = authordata



        if (!fname && !lname && !title && !email && !password) {

            return res.status(400).send({ status: false, msg: "Please fill the all of the details of Author" })
        }
        else {
            if (!fname) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter First Name" })
            }

            // console.log(fname);
            // const finalfname = fname.trim()

            // // console.log(finalfname);


            if (typeof fname !== "string" || fname.trim().length == 0 ){
                return res.status(400).send({ status: false, msg: "Please enter First Name properly" })
            }
            

            if (!lname) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Last Name" })
            }

            if (typeof lname !== "string" || lname.trim().length == 0 ){
                return res.status(400).send({ status: false, msg: "Please enter Last Name properly" })
            }


            if (!title) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Title of the name " })
            }



            if (typeof title !== "string" || title.trim().length == 0  ){
                return res.status(400).send({ status: false, msg: "Please enter title properly" })
            } 

            if (["Mr", "Mrs", "Miss"].indexOf(title) == -1 ) {
                return res.status(400).send({ status: false, data: "Enter a valid title Mr or Mrs or Miss ", })
            };

            if (typeof title !== "string" || lname.trim().length == 0 ){
                return res.status(400).send({ status: false, msg: "Please enter title properly" })
            }



            if (!email) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter email address" })
            }


            let checkEmail = validator.validate(email)
            if (!checkEmail) {
                return res.status(400).send({ status: false, msg: "please enter the email address properly " })
            }

            let uniqueEmail = await authorModel.findOne({ email: email })

            if (uniqueEmail) {
                return res.status(400).send({ status: false, msg: "Sorry! this email is already exists" })
            }


            if (!password) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Password" })
            }

            let schema = new passwordValidator();
            schema.is().min(8).is().max(100).has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123', 'mypassword']);
            let checkPassword = schema.validate(password)


            if (checkPassword === false) {
                return res.status(400).send({ status: false, msg: "password should be have minimum 8 character atleast one Uppercase & lowercase & minimum 2 digits & should not have white space & should not be like this : Passw0rd, Password123,mypassword" })
            }



        }
     
        const finalData = await authorModel.create(authordata);
        return res.status(201).send({ status: true, data: finalData })
    }
    
    catch (error) {
        console.log("this is the error ", error.message)
        res.status(500).send({ msg: error.message })

    }

}



const authorLogin = async function (req, res) {

    const bodyData = req.body

    // if(Object.keys(bodyData) == 0){
    //     return res.send({status:false , msg:"Please Enter the Email & Password"})
    // }
    const username = req.body.email
    const password = req.body.password

    if (!username && !password) {
        return res.status(400).send({ status: false, msg: "Please Enter the Email & password" })
    } else {

        if (!username) {
            return res.status(400).send({ status: false, msg: "Please Enter the Email" })
        }

        let checkEmail = validator.validate(username)
        if (!checkEmail) {
            return res.status(400).send({ status: false, msg: "please enter the email address properly " })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Please Enter the Password" })
        }

    }

    console.log(username);
    const findAuthor = await authorModel.findOne({ email: username, password: password })
    if (!findAuthor) {
        return res.status(401).send({ status: false, data: "Make sure your email & Password Correct. sorry No Author found Or Your Credentials are not Matched, Please Create Author first" })
    }


    const token = jwt.sign({
        userId: findAuthor._id.toString(),
        iat:Math.floor(Date.now() / 1000),
        exp:Math.floor(Date.now() / 1000) + 10*60*60

        // autherType: "test",
        // projectName: "blog-project"
    }, "my-first-blog-project"
    )

    res.setHeader("x-api-key", token)
    return res.status(201).send({ status: true, data: token })

}




module.exports.authorLogin = authorLogin
module.exports.createAuthor = createAuthor