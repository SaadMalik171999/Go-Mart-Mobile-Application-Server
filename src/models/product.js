const mongoose = require("mongoose");

//// Code  ////
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      minlength: 3,
    },
    productImage: {
      type: String,
    },
    productCategory:{
      type: String,
      required : true
    },
    productCompany:[
      {
        companyName:{type: String},
        companyPrice: {type: Number},
        companyProductStock: {type: Number}
      }
    ]
  },
  { timestamps: true }
);

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
