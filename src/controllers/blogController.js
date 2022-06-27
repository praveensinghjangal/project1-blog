const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')
// const { modelNames } = require('mongoose')
//const dataValidator = require('data-validator-js')



const createBlog = async function (req, res) {

    try {
        const blogData = req.body
        console.log(blogData);

        let { title, body, authorId, tags, category, subcategory } = blogData;

        if (Object.keys(blogData).length == 0) {
            return res.status(400).send({ status: false, msg: "Please Provide Author Details Properly" })
        }


        if (!title && !body && !authorId && !tags && !category && !subcategory) {

            return res.send({ status: false, msg: "All the feild are required" })

        } else {

            if (!title) {

                return res.status(400).send({ status: false, msg: "Please enter title" })
            }

            if (typeof title !== "string" || title.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter title properly" })
            }

            if (!title.length > 2) {

                return res.status(400).send({ status: false, msg: "Please add more word in title" })
            }


            if (!body) {
                return res.status(400).send({ status: false, msg: "Please enter body" })
            }


            if (typeof body !== "string" || body.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter body properly" })
            }

            if (body.length < 4) {

                return res.status(400).send({ status: false, msg: "body length should be more than 4 characters" })
            }

            if (!authorId) {

                return res.status(400).send({ status: false, msg: "Please enter authorId" })
            }

            if (authorId.length !== 24) {

                return res.status(400).send({ status: false, msg: "Please enter the valid authorId" })
            }
            if (!tags) {
                return res.status(400).send({ status: false, msg: "Please enter tags" })
            }


            if (tags.length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter the tags words" })
            }

            for (let i = 0; i < tags.length; i++) {

                if (tags[i].length == 0) {

                    return res.send({ status: false, msg: "tags feild cannot be empty" })
                }
            }


            for (let i = 0; i < tags.length; i++) {


                if (typeof tags[i] !== "string" || tags[i].trim().length == 0) {

                    return res.status(400).send({ status: false, msg: "Make sure your tags is on correct format or not??" })
                }

            }



            if (!category) {

                return res.status(400).send({ status: false, msg: "Please enter category" })
            }


            if (typeof category !== "string" || category.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter category properly" })
            }



            if (!subcategory) {

                return res.status(400).send({ status: false, msg: "Please enter category" })
            }



            if (subcategory.length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter the subcategory words" })

            }


            for (let i = 0; i < subcategory.length; i++) {

                if (subcategory[i].length == 0) {

                    return res.send({ status: false, msg: "subcategory feild cannot be empty" })
                }
            }


            for (let i = 0; i < subcategory.length; i++) {


                if (typeof subcategory[i] !== "string" || subcategory[i].trim().length == 0) {

                    return res.status(400).send({ status: false, msg: "Make sure your subcategory is on correct format or not??" })
                }

            }


            let validAuthor = await authorModel.findById(authorId)

            if (!validAuthor) {

                return res.status(400).send({ status: false, msg: "Please enter the valid authorId" })

            }


            const checkAuthorId = await authorModel.findById(req.body.authorId)

            if (!checkAuthorId) {

                res.status(400).send({ msg: "Please Enter Valid AuthorId" })
            }


        }

        finalData = await blogModel.create(blogData);
        res.status(201).send({ msg: finalData })
    }
    catch (error) {
        console.log("this is the error ", error.message)
        res.status(500).send({ msg: error.message })

    }
}


/**************get all blog by filter****************/



const getBlogs = async function (req, res) {

    try {

        const filter = req.query;
        console.log(filter.authorId);


        if (filter.authorId) {

            if (filter.authorId.length !== 24) {

                return res.send({ status: false, msg: "Make sure your Author Id is correct or not??" })

            }
        }

        const allBlog = await blogModel.find({ $and: [filter, { isDeleted: false }, { isPublished: true }] })

        if (!allBlog[0]) {

            return res.send({ status: false, msg: "Sorry! Dude No Blog Found" })
        }

        return res.status(200).send({ status: true, data: allBlog })

    } catch (error) {

        console.log("this is the error ", error.message)

        return res.status(500).send({ status: false, msg: error.message })

    }
}



/**************Update Blog****************/


const updateBlog = async function (req, res) {
    try {
        const getId = req.params
        let { title, body, tags, category, subcategory } = req.body

        console.log(getId.blogId);

        if (!getId.blogId) {
            return res.status(400).send({ status: false, msg: "Please Enter the Blog Id" })
        }


        if (getId.blogId.length !== 24) {

            return res.send({ status: false, msg: "Make sure your Blog Id is correct or not??" })

        }

        if (title) {

            if (typeof title !== "string" || title.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter title properly" })
            }

            if (!title.length > 2) {

                return res.status(400).send({ status: false, msg: "Please add more word in title" })
            }



        }

        if (body) {

            if (typeof body !== "string" || body.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter body properly" })
            }

            if (body.length < 4) {

                return res.status(400).send({ status: false, msg: "body length should be more than 4 characters" })
            }
        }


        if (tags) {

            if (tags.length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter the tags words" })
            }

            for (let i = 0; i < tags.length; i++) {

                if (tags[i].length == 0) {

                    return res.send({ status: false, msg: "tags feild cannot be empty" })
                }
            }


            for (let i = 0; i < tags.length; i++) {


                if (typeof tags[i] !== "string" || tags[i].trim().length == 0) {

                    return res.status(400).send({ status: false, msg: "Make sure your tags is on correct format or not??" })
                }

            }

        }

        if (category) {

            if (typeof category !== "string" || category.trim().length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter category properly" })
            }


        }

        if (subcategory) {

            if (subcategory.length == 0) {

                return res.status(400).send({ status: false, msg: "Please enter the subcategory words" })

            }


            for (let i = 0; i < subcategory.length; i++) {

                if (subcategory[i].length == 0) {

                    return res.send({ status: false, msg: "subcategory feild cannot be empty" })
                }
            }


            for (let i = 0; i < subcategory.length; i++) {


                if (typeof subcategory[i] !== "string" || subcategory[i].trim().length == 0) {

                    return res.status(400).send({ status: false, msg: "Make sure your subcategory is on correct format or not??" })
                }

            }
        }



        // if (!title || title === undefined) {
        //   return res.status(400).send({ status: false, msg: "title value is must be present" })
        // }
        // if (title.trim().length === 0 || typeof title !== "string") {
        //   return res.status(400).send({ status: false, msg: "title value is must be present" })
        // }



        const blogData = req.body


        const updateBlog = await blogModel.findOneAndUpdate(
            { _id: getId.blogId, isDeleted: false },
            {
                $set: {
                    title: title,
                    body: body,
                    category: category,
                    tags: tags,
                    subcategory: subcategory,
                    isPublished: true,
                    publishedAt: new Date()
                }
            },
            { new: true }
        );

        return res.send({ msg: updateBlog }); //updated data 
    } catch (error) {
        console.log("this is an error", error.message);
        res.status(500).send({ msg: error.message });
    }
};



/**************Delete Blog by Blog Id****************/


const deleteBlogByPath = async function (req, res) {
    try {

        const getId = req.params;

        if (getId.blogId.length !== 24) {

            return res.send({ status: false, msg: "Make sure your Blog Id is correct or not??" })

        }



        const deletedblog = await blogModel.findOneAndUpdate(
            { _id: getId.blogId, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true })


        if (!deletedblog) {
            res.status(400).send({ status: false, msg: "No such as blog found" })
        }
        res.status(200).send({ msg: "Done: this blog is deleted" })

    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
};

const deleteBlogByQuery = async function (req, res) {

    try {

        let data = req.query

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "You forgot to enter Query" })
        }




        const deleteByQuery = await blogModel.findOneAndUpdate(
            { _id: data, isDeleted: false },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        )

        if (!deleteByQuery)
            return res.status(400).send({ status: false, msg: "No blog found" })

    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
}


module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.deleteBlogByPath = deleteBlogByPath
module.exports.deleteBlogByQuery = deleteBlogByQuery
module.exports.updateBlog = updateBlog