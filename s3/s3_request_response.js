// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'ap-south-1'});
AWS.config.logger = console;


// Create S3 service object
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
      // Using this keyword to access AWS.Response object and properties
    console.log("Response data and headers: " + JSON.stringify(this.httpResponse));
  
  } else {
    
    console.log("request", AWS.Request);
    console.log("Success", data.Buckets);
    console.log("response", this.httpResponse);
    
  }
});
// JavaScript File
