const FormData = require("form-data");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const requests = require("request");

class imageController {
  static scanImage = async (request, response) => {
    console.log(request.file);
    if (!request.file) {
      response.send({
        status: "Failed",
        Message: "Image Didn't Find!",
      });
    } else {
      const options = {
        method: "POST",
        url: "https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/",
        headers: {
          "content-type":
            "multipart/form-data; boundary=---011000010111000001101001",
          "X-RapidAPI-Key":
            "36fd71413emsh4bbdac0d60e9845p175fa1jsn24d134faa39c",
          "X-RapidAPI-Host": "pen-to-print-handwriting-ocr.p.rapidapi.com",
          useQueryString: true,
        },
        formData: {
          srcImg: {
            value: fs.createReadStream(request.file.path),
            options: {
              filename: request.file.filename,
              contentType: "application/octet-stream",
            },
          },
          Session: "string",
        },
      };

      requests(options, function (error, res, body) {
        try {
          if (body) {
            let objectBody = JSON.parse(body);
            const value = objectBody.value.split("\n");

            response.status(200).send({
              Status: "Success",
              Message: value,
            });
          }
          const directory = path.resolve("src/images");
          fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
              fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
              });
            }
          });
        } catch (err) {
          if (error) {
            response.status(200).send({
              Status: "Failed",
              Error: error,
            });
          } else {
            console.log(err);
          }
        }
      });
    }
  };

  
}

module.exports = imageController;
