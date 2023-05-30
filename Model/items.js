const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    userId:{ type: Schema.Types.ObjectId, ref: "users", required: true },
    id:{type:Number, required:true},
        name:{type:String, required:true},
        description:{type:String, required:true},
        qty:{type:Number, required:true},
        price:{type:Number, required:true},

})

module.exports = mongoose.model("items", itemSchema, "items");