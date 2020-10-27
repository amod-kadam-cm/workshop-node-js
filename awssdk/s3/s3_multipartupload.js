/*
by Martin Güther @magegu

just call it: 

uploadFile(absoluteFilePath, callback);
*/

var path = require('path');
var async = require('async');
var fs = require('fs');
var AWS = require('aws-sdk'); 

//Method -1 :read credentials from default profile
var credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

// set logging
// Require logplease
const logplease = require('logplease');
// Set external log file option
logplease.setLogfile('debug.log');
// Set log level
logplease.setLogLevel('DEBUG');

const options = {
  useColors: true,     // Enable colors
  showTimestamp: true, // Display timestamp in the log message
  useLocalTime: true, // Display timestamp in local timezone
  showLevel: true,     // Display log level in the log message
  filename: 'debug.log',      // Set file path to log to a file
  appendFile: true,    // Append logfile instead of overwriting
};
// Create logger
const logger = logplease.create('s3-logger',options);

// Assign logger to SDK
AWS.config.logger = logger;

var s3 = new AWS.S3(); 
var bucketName = "temp27101756";

uploadFile
('/home/ec2-user/environment/workshop-node-js/awssdk/s3/aws-sdk-java-dg.pdf',
(err, mData) => {
  if (err){
  console.log(err);
  } else {
    console.log (mData);
  }

});


function uploadMultipart(absoluteFilePath, fileName, uploadCb) {
  s3.createMultipartUpload({ Bucket: bucketName, Key: fileName }, (mpErr, multipart) => {
    if(!mpErr){
      //console.log("multipart created", multipart.UploadId);
      fs.readFile(absoluteFilePath, (err, fileData) => {

        var partSize = 1024 * 1024 * 5;
        var parts = Math.ceil(fileData.length / partSize);

        async.timesSeries(parts, (partNum, next) => {

          var rangeStart = partNum*partSize;
          var end = Math.min(rangeStart + partSize, fileData.length);

          console.log("uploading ", fileName, " % ", (partNum/parts).toFixed(2));

          partNum++;  
          async.retry((retryCb) => {
            s3.uploadPart({
              Body: fileData.slice(rangeStart, end),
              Bucket: bucketName,
              Key: fileName,
              PartNumber: partNum,
              UploadId: multipart.UploadId
            }, (err, mData) => {
              retryCb(err, mData);
            });
          }, (err, data)  => {
            //console.log(data);
            next(err, {ETag: data.ETag, PartNumber: partNum});
          });

        }, (err, dataPacks) => {
          s3.completeMultipartUpload({
            Bucket: bucketName,
            Key: fileName,
            MultipartUpload: {
              Parts: dataPacks
            },
            UploadId: multipart.UploadId
          }, uploadCb);
        });
      });
    }else{
      uploadCb(mpErr);
    }
  });
}

function uploadFile(absoluteFilePath, uploadCb) {
  var fileName = path.basename(absoluteFilePath);
  var stats = fs.statSync(absoluteFilePath)
  var fileSizeInBytes = stats["size"]

  if(fileSizeInBytes < (1024*1024*5)) {
    async.retry((retryCb) => {
      fs.readFile(absoluteFilePath, (err, fileData) => {
        s3.putObject({
          Bucket: bucketName, 
          Key: fileName, 
          Body: fileData
        }, retryCb);        
      });
    }, uploadCb);
  }else{
    uploadMultipart(absoluteFilePath, fileName, uploadCb);
  }
}


