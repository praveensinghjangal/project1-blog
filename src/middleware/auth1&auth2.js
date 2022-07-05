
const jwt = require('jsonwebtoken');
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')



/******************************************authentication*********************************************/



const authentication = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"]


        // if(!token) { token = req.headers["x-Auth-Key"] }

        if (!token) {
            return res.status(404).send({ status: false, msg: "token not found" })
        }
        const decodedToken = jwt.verify(token, "my-first-blog-project")
        if (!decodedToken) {
            return res.status(401).send({ status: false, msg: "authentication failed" })
        }
        req.dtoken= decodedToken
    }
    catch (error) {
        console.log("this is the error ", error.message);
        return res.status(500).send({ status: false, msg: error.message })
    }
   
    next()
}

/******************************************authorization*********************************************/


const authorizationParams = async function (req, res, next) {

    try {
        
        let token = req.headers["x-api-key"]


        const blogId=req.params.blogId
         console.log(blogId)
        if (blogId.length < 24) {

            return res.status(400).send({ status: false, msg: "Make sure your Blog Id is correct or not??" })
      
          }


         const findAuthor= await blogModel.findOne({_id: blogId})
         if(!findAuthor) return res.status(400).send({status: false, msg:"No such blog available"})
// if(findAuthor == null){
        //     return res.status(400).send({ status: false, msg: "abc" })
        // }
      const Id= findAuthor.authorId
      console.log(Id)
        
        let tokenData= req.dtoken
         if(Id != tokenData.userId ){
           return  res.status(403).send({status:false,msg:"Sorry! You are not authorized to do this."})
         
         }
 
        next()
    } catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }
}


/******************************************authorization*********************************************/
const authorizationQuery = async function (req, res, next) {
 
    try {
        let data= req.query
        if(Object.keys(data).length == 0) return res.status(400).send({status:false, msg: "please provide data in query"})
       
      let decodedToken = req.dtoken
        let savedData= await blogModel.find(data)
        if(savedData.length == 0) return res.status(400).send({status: false, msg: "no such blog available"})
         let id= savedData.map( (x) => {return x.authorId.toString()} )
         let authorIdintoken= decodedToken.userId
         if(id.includes(authorIdintoken)){
            next()
         }else{ return res.status(403).send( {status: false, msg: "Not Authorised"})}
      
        
    } catch (err) {
        res.status(500).send({ msg: "Errorrr", error: err.message })
    }
}

















module.exports.authentication = authentication

module.exports.authorizationQuery = authorizationQuery
module.exports.authorizationParams= authorizationParams











//optional || 


// const authorizationBody = async function (req, res, next) {

//     try {
//         let token = req.headers["x-auth-key"]

//         let decodedToken = jwt.verify(token, "my-first-blog-project")


//         let bodyPresent = req.body

//         let authorToBeModified = bodyPresent.authorId

//         let authorLogin = decodedToken.userId

//         if (authorToBeModified != authorLogin) {

//             console.log(authorLogin);
//             console.log(authorToBeModified);

//             return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//         }

//         next()
//     } catch (err) {
//         res.status(500).send({ msg: "Error", error: err.message })
//     }
// }

// module.exports.authorizationBody = authorizationBody






// const authorization = async function (req, res, next) {


//     try {
//         let token = req.headers["x-auth-key"]

//         let decodedToken = jwt.verify(token, "my-first-blog-project")

//         let bodyPresent = req.body



//         if (req.query) {

//             let authorToBeModified = req.query.userId

//             let authorLogin = decodedToken.userId

//             if (authorToBeModified != authorLogin) {
//                 return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//             }

//         }




//         if (req.params) {

//             const checkAuthor = await blogModel.find({ _id: req.params.blogId }).select({ authorId: 1 })


//             let authorToBeModified = checkAuthor.authorId

//             let authorLogin = decodedToken.userId

//             if (authorToBeModified != authorLogin) {
//                 return res.status(403).send({ status: false, msg: "Sorry! You are not authorized to do this." })
//             }
//         }





//         next()
//     }

//     catch (err) {
//         res.status(500).send({ msg: "Error", error: err.message })
//     }
// }