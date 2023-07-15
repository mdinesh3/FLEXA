const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    Name:
    {
        type: String,
        required: true,
    },
    ModelNo:
    {
        type: Number,
        required: true,
        unique: true,
    },
    Model:
    {
        type: String,
        required: true,
    },
    Category:
    {
        type: String,
        required: true
    },
},{timestamps:true});

const product = mongoose.model("Product",ProductSchema);
module.exports = product;