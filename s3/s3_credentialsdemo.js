
var AWS = require("aws-sdk");

// recommended to lock to specific version in PROD environment
AWS.config.apiVersions = {
  dynamodb: '2011-12-05',
  ec2: '2013-02-01',
  redshift: 'latest'
};


// get credentials - Sharing this with you
AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    
  }
});// JavaScript File
