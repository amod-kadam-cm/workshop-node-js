// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});

// Create S3 service object

var s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'ap-south-1'});

var params = {
  Bucket: 'temp27101756',
  Key: 'example2.txt',
  Body: 'Uploaded text using the promise-based method!'
};

var putObjectPromise = s3.putObject(params).promise();

putObjectPromise.then(function(data) {
  console.log('Success');
}).catch(function(err) {
  console.log(err);
});
