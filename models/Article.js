var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({

    headline: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    // referencing the `Comment.js` file containing the Comment schema model
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment" 
    }


});

var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article
