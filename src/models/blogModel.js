const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogsSchema = new mongoose.Schema( {
     title: {
        type: String,
        require: true,
        trim:true
    
    }, 
     
    body: {
        type: String,
        require: true,
        trim:true
        
    }, 
     
    authorId: {
    type: ObjectId,
    ref:'Author'
    },

    tags: [{
        type:String,
        trim: true}],
        
    category: {
        type: String,
        require: true,
        
    }, 
          //  examples: [technology, entertainment, life style, food, fashion]},
     subcategory: [{type:String,
     trim:true 
     }],
          //  examples[technology-[web development, mobile development, AI, ML etc]] },
     deletedAt: { type: Date, default: null}, 
     isDeleted: {
        type:Boolean,
        default: false
    }, 
     publishedAt:  { type: Date, default: null},
     isPublished: {
        type:Boolean,
        default: false
    }},
         { timestamps: true });

module.exports = mongoose.model('blog', blogsSchema)