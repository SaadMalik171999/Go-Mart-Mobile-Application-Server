const express = require("express");
const router = new express.Router();
const FinalProduct = require("../models/FinalProduct");
const mongoose = require("mongoose");

router.post("/finalproduct", async (request, response) => {
  console.log(request.body)
  try {
    if(request.body.ProductName !== undefined){
    const product = new FinalProduct(request.body);
    const createProduct = await product.save();
    response.status(201).json(createProduct);
}
else{
    response.status(201).json("Object is Empty");
}
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/finalproduct", async (request, response) => {
  try {
    const product = await FinalProduct.find();
    // console.log(product)
    response.status(200).send(product);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.get("/getSearchProduct", async (request, response) => {
  try {
    const product = await FinalProduct.find();
    var filterData = [];
    let productArray = request.body;
    const myArray = productArray.productsSearch.split(",");
    for (let i=0; i < myArray.length; i++) {
      myArray[i] = myArray[i].trim();
      filterData.push(product.find(x=>x.ProductName == myArray[i]));
    }
    for (let i=0; i < filterData.length; i++) {
      if(filterData[i].priceItemOne < filterData[i].priceItemTwo && filterData[i].priceItemOne < filterData[i].priceItemThree){
        filterData[i].lowestPriceItemOne = filterData[i].priceItemOne;
      }
      else if(filterData[i].priceItemTwo < filterData[i].priceItemOne && filterData[i].priceItemTwo < filterData[i].priceItemThree){
        filterData[i].lowestPriceItemTwo = filterData[i].priceItemTwo;
      }
      else if(filterData[i].priceItemThree < filterData[i].priceItemOne && filterData[i].priceItemThree < filterData[i].priceItemTwo){
        filterData[i].lowestPriceItemThree = filterData[i].priceItemThree;
      }
    }
  response.status(200).json(filterData);
    
  } catch (error) {
    response.status(200).json("Your Request not Acceptable");
  }
});

//// Code  ////
router.get("/finalproduct/:id", async (request, response) => {
  const _id = request.params.id;
  const product = await FinalProduct.findById(_id);
  if (product !== null) {
    response.json(product);
  } else {
    response.status(400).json("Not Find");
  }
});

router.put("/finalproduct/:id", async (request, response) => {
  try {
    const _id = request.params.id;
    const product = await FinalProduct.findByIdAndUpdate(_id, request.body, {
      new: true,
    });
    response.json(product);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.delete("/finalproduct/:id", async (request, response) => {
    const _id = request.params.id;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).json("Product not existed");
    }
    else{
        await Product.findByIdAndDelete(_id);
        response.status(200).json("Product has been deleted");
       
    }
}

);



module.exports = router;
