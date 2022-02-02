const {Schema} = require('mongoose');
module.exports = mongoose => {
    return mongoose.model(
        "post",
        mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true
                },
                keywords: [String],
                shortDescription: {
                    type: String,
                    required: true
                },
                imgPath: String,
                author: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                    required: true
                },
                category: {
                    type: Schema.Types.ObjectId,
                    ref: "category",
                    required: true
                },
                isPublished: Boolean
            },
            { timestamps: true}
        )
    );
};