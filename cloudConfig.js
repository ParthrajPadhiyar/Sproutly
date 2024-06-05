const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({  // configer means koi ne koi sathe jodvu to aapde backend ne cloud shathe jodsu
    cloud_name: process.env.CLOUD_NAME,  // ahi je key aapi che cloud_name, api_key , api_secret ae by default che
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// now define our storage

const storage = new CloudinaryStorage({ // storage like we crate a folder and stores files on that
    cloudinary: cloudinary,
    params: {
      folder: 'sproutly_DEV',
      //format: async (req, file) => 'png', // supports promises as well
      allowedFormats: ["png","jpg", "jpeg"],
      //public_id: (req, file) => 'computed-filename-using-request',
    },
  });



module.exports = {
    cloudinary,
    storage,
};