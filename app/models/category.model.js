const {Schema} = require('mongoose');
module.exports = mongoose => {
    return mongoose.model(
        "category",
        mongoose.Schema(
            {
                name: String,
                shortDescription: String,
                author: {
                    type: Schema.Types.ObjectId,
                    ref: "User"
                }
            },
            { timestamps: true }
        )
    );
};