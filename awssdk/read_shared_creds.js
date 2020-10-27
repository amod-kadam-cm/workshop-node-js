//load the AWS SDK
var AWS = require('aws-sdk');

//Method -1 :read credentials from default profile
var credentials = new AWS.SharedIniFileCredentials();

//Method 2 :  read credentials from shared file
//var credentials = new AWS.SharedIniFileCredentials({ profile: 'temp_training' });

AWS.config.credentials = credentials;

console.log('access key is : ' + AWS.config.credentials.accessKeyId)
console.log('secret key is : ' + AWS.config.credentials.secretAccessKey)
