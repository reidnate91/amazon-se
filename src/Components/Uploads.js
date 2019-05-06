require('dotenv').config()
import React  from 'react'
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const express = require("express");
const router = express.Router();
const upload = require('../services/multer');
const cors = require((cors))

app.use(cors)

aws.config.update({
    // Your SECRET ACCESS KEY from AWS should go here,
    
    secretAccessKey: 'AKIAI6F6X66ALQWDOFBQ',
    //  Your ACCESS KEY ID from AWS should go here,
    
    accessKeyId: 'wLVCZvTloIbi0Wdsn8UmXdCBbvZ85tiPTIteK3uF' ,
    region: 'us-west-1' // region of your bucket
});



const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'cars-bucket',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })
  
  module.exports = upload;


  const singleUpload = upload.single('image')

router.post('/', function(req, res) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
    }

    return res.json({'imageUrl': req.file.location});
  });
})

module.exports = router;