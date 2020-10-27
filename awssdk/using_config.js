//load the AWS SDK
var AWS = require('aws-sdk');

// setting config object - method 1
var config = new AWS.Config({
    accessKeyId: 'akid',
    secretAccessKey: 'secret',
    region: 'us-east-1'
});

// setting config object - method 2

// using Credentials Objects
var myCredentials = new AWS.Credentials('akid', 'secret', 'session');

// setup the global configuration object
var myConfig = new AWS.Config({
    credentials: myCredentials,
    region: 'us-east-1'
});

// Service specific configuration
var s3 = new AWS.S3(myConfig);
//Using a Shared Config File
console.log('[region] from s3 service config : ' + myConfig.region);

// locking apiVersion , choosing region 
var s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-east-1' });

// Updatting  Global Configuration Object
AWS.config.update({region: 'ap-south-1'});

//Using a Shared Config File
console.log('[region] from global config : ' + AWS.config.region);