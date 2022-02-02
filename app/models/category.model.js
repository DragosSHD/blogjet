const {Schema} = require('mongoose');
module.exports = mongoose => {
    return mongoose.model(
        "category",
        mongoose.Schema(
            {
                name: {
                    type: String,
                    required: true
                },
                shortDescription: String,
                author: {
                    type: Schema.Types.ObjectId,
                    ref: "user",
                    required: true
                }
            },
            { timestamps: true }
        )
    );
};