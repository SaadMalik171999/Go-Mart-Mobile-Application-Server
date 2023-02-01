const mongoose = require("mongoose");

//// Code  ////
const FinalProductSchema = mongoose.Schema(
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

const FinalProduct = new mongoose.model("FinalProduct", FinalProductSchema);

module.exports = FinalProduct;
