const express = require("express");
const router = new express.Router();
const path = require("path");
const fs = require("fs");
const FinalProduct = require("../models/FinalProduct");

router.post("/allproductlist", async (request, response) => {
  try {
    deleteData();
    const filePath = path.join(
      "E:/SAAD DATA/PERSONAL PRACTICE PROJECTS/Final Year Project/Go Smart Grocery Backend/src/Files/ScrapData.json"
    );
    fs.readFile(filePath, "utf-8", (err, item) => {
      const dataWithoutId = [];
      if (item) {
        const jsonformat = JSON.parse(item);
        data = jsonformat;
        jsonformat?.map((x) => {
          dataWithoutId?.push({
            productImage: x?.productImage,
            productName: x?.productName,
            companyPrice: x?.companyPrice,
            productCategory: x?.productCategory,
            companyName: x?.companyName,
            companyProductStock: x?.companyProductStock,
          });
        });
      }
      postFilterData(dataWithoutId);
    });

    const filePath2 = path.join(
      "E:/SAAD DATA/PERSONAL PRACTICE PROJECTS/Final Year Project/Go Smart Grocery Backend/src/Files/ScrapData2.json"
    );
    fs.readFile(filePath2, "utf-8", (err, item) => {
      const dataWithoutId = [];
      if (item) {
        const jsonformat = JSON.parse(item);
        data = jsonformat;
        jsonformat?.map((x) => {
          dataWithoutId?.push({
            productImage: x?.productImage,
            productName: x?.productName,
            companyPrice: x?.companyPrice,
            productCategory: x?.productCategory,
            companyName: x?.companyName,
            companyProductStock: x?.companyProductStock,
          });
        });
      }
      postFilterData(dataWithoutId);
    });

    const filePath3 = path.join(
      "E:/SAAD DATA/PERSONAL PRACTICE PROJECTS/Final Year Project/Go Smart Grocery Backend/src/Files/ScrapData3.json"
    );
    fs.readFile(filePath3, "utf-8", (err, item) => {
      const dataWithoutId = [];
      if (item) {
        const jsonformat = JSON.parse(item);
        data = jsonformat;
        jsonformat?.map((x) => {
          dataWithoutId?.push({
            productImage: x?.productImage,
            productName: x?.productName,
            companyPrice: x?.companyPrice,
            productCategory: x?.productCategory,
            companyName: x?.companyName,
            companyProductStock: x?.companyProductStock,
          });
        });
      }
      postFilterData(dataWithoutId);
      makeObject(combinedArray);
    });
    return response.status(200).json("DATA COMPLETE");
  } catch (error) {
    return response.status(200).json(error);
  }
});

const postFilterData = async (dataWithoutId) => {
  combinedArray.push(dataWithoutId);
};

var combinedArray = [];
function makeObject(array) {
  combinedArray = [];
  var combinedArrayData = [];
  var newdata = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      combinedArrayData.push(array[i][j]);
    }
  }
  combinedArrayData.sort((a, b) => a.productName.localeCompare(b.productName));
  for (let k = 0; k <= combinedArrayData.length; k++) {
    for (let l = 0; l < k; l++) {
      if (
        combinedArrayData[l].productName === combinedArrayData[k]?.productName
      ) {
        newdata.push({
          productName: combinedArrayData[l].productName,
          productImage: combinedArrayData[l].productImage,
          productCategory: combinedArrayData[l].productCategory,
          productCompany: [
            {
              companyName: combinedArrayData[l].companyName,
              companyPrice: combinedArrayData[l].companyPrice,
              companyProductStock: combinedArrayData[l].companyProductStock,
            },
            {
              companyName: combinedArrayData[k].companyName,
              companyPrice: combinedArrayData[k].companyPrice,
              companyProductStock: combinedArrayData[k].companyProductStock,
            },
          ],
        });
      } else if (combinedArrayData[l].productName !== newdata[l]?.productName) {
        newdata.push({
          productName: combinedArrayData[l].productName,
          productImage: combinedArrayData[l].productImage,
          productCategory: combinedArrayData[l].productCategory,
          productCompany: [
            {
              companyName: combinedArrayData[l].companyName,
              companyPrice: combinedArrayData[l].companyPrice,
              companyProductStock: combinedArrayData[l].companyProductStock,
            },
          ],
        });
      }
    }
  }
  removeDuplicatesInArray(newdata);
}

function removeDuplicatesInArray(data) {
  const temp = [];
  const temp2 = [];
  const temp3 = [];

  for (const obj of data) {
    const { productName } = obj;
    const newObj = { productName };
    const str = JSON.stringify(newObj);
    const str2 = JSON.stringify(obj);
    if (!temp.includes(str)) {
      temp.push(str);
      temp2.push(str2);
    } else {
      temp3.push(str2);
    }
  }
  var filterItem = temp2.map((str2) => JSON.parse(str2));
  var filterItem2 = temp3.map((str3) => JSON.parse(str3));
  removeDuplicateswithObjects(filterItem, filterItem2);
}

function removeDuplicateswithObjects(filterItem, filterItem2) {
  const filteredData = [];
  for (let a = 0; a < filterItem.length; a++) {
    for (let b = 0; b <= filterItem2.length; b++) {
      if (filterItem[a].productName === filterItem2[b]?.productName) {
        filteredData.push({
          productName: filterItem[a]?.productName,
          productImage: filterItem[a]?.productImage,
          productCategory: filterItem[a]?.productCategory,
          productCompany: [
            {
              companyName: filterItem[a]?.productCompany[0]?.companyName,
              companyPrice: filterItem[a]?.productCompany[0]?.companyPrice,
              companyProductStock:
                filterItem[a]?.productCompany[0]?.companyProductStock,
            },
            {
              companyName: filterItem[a]?.productCompany[1]?.companyName,
              companyPrice: filterItem[a]?.productCompany[1]?.companyPrice,
              companyProductStock:
                filterItem[a]?.productCompany[1]?.companyProductStock,
            },
            {
              companyName: filterItem2[b]?.productCompany[1]?.companyName,
              companyPrice: filterItem2[b]?.productCompany[1]?.companyPrice,
              companyProductStock:
                filterItem2[b]?.productCompany[1]?.companyProductStock,
            },
          ],
        });
      }
    }
    b = 0;
  }
  const dada = filteredData;
  filteredData.sort((a, b) => {
    b.productCompany.length > a.productCompany.length ? 1 : -1;
  });

  const tempData = [];
  const tempData2 = [];
  for (const obj of filteredData) {
    const { productName } = obj;
    const newObj = { productName };
    const strData = JSON.stringify(newObj);
    const strData2 = JSON.stringify(obj);
    if (!tempData.includes(strData)) {
      tempData.push(strData);
      tempData2.push(strData2);
    }
  }
  arrangedData = tempData2.map((str2) => JSON.parse(str2));
  if (arrangedData) {
    for (let index = 0; index < arrangedData?.length; index++) {
      const element = arrangedData[index];
      const ProductListOneData = new FinalProduct(element);
      ProductListOneData.save();
    }
  }
}

async function deleteData() {
  const deletePreviousData = await FinalProduct.deleteMany();
}
module.exports = router;
