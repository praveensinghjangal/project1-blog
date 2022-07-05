const express = require('express');
const router = express.Router();
const autherController = require('../controllers/authorController');
const blogController = require('../controllers/blogController');
const mw = require('../middleware/auth1&auth2')


//API for Create New Author
router.post('/authors', autherController.createAuthor )

//API for Create New Blog
router.post('/blogs',mw.authentication, blogController.createBlog )

//API for Get the blog 
router.get('/blogs',mw.authentication, blogController.getBlogs)


router.put('/blogs/:blogId',mw.authentication,mw.authorizationParams, blogController.updateBlog)


router.delete('/blogs/:blogId', mw.authentication, mw.authorizationParams , blogController.deleteBlogByPath)


router.delete('/blogs/',mw.authentication, mw.authorizationQuery, blogController.deleteBlogByQuery)


router.post('/login', autherController.authorLogin)




// if api is invalid OR wrong URL

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "Make Sure Your Endpoint is Correct or Not!"
    })
})



module.exports = router;
// adding this comment for no reason