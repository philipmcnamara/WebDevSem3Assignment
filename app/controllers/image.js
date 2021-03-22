const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dtoindymd',
  api_key: '695639417668485',
  api_secret: 'dO8Iu7Rdco_PFD1JyHD55xKdDJ0'
});


cloudinary.uploader.upload("my_image.jpg", function(error, result) {console.log(result, error)});