/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

//snippet-sourcedescription:[ddb_batchwriteitem.js demonstrates how to put or delete items into an Amazon DynamoDB table.]
//snippet-service:[dynamodb]
//snippet-keyword:[JavaScript]
//snippet-sourcesyntax:[javascript]
//snippet-keyword:[Code Sample]
//snippet-keyword:[Amazon DynamoDB]
//snippet-sourcetype:[full-example]
//snippet-sourcedate:[2018-06-02]
//snippet-sourceauthor:[AWS-JSDG]

// ABOUT THIS NODE.JS SAMPLE: This sample is part of the SDK for JavaScript Developer Guide topic at
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html

// snippet-start:[dynamodb.JavaScript.batch.WriteItem]
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
//AWS.config.update({ region: 'ap-south-1' });

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-east-1'
});

var params = {
    RequestItems: {
        "CUSTOMER_LIST": [{
                PutRequest: {
                    Item: {
                       "CUSTOMER_ID": { N: '002' },
                        "CUSTOMER_NAME": { S: 'Amod Kadam' },
                        "EMAIL": { "S": "amod.kadam@gmail.com" },
                        "AGE": { "N": "45" }
                    }
                }

            },
            {
                PutRequest: {
                    Item: {
                        "CUSTOMER_ID": { N: '003' },
                        "CUSTOMER_NAME": { S: 'Steve Jobs' },
                        "EMAIL": { "S": "steve.jobs@gmail.com" },
                        "AGE": { "N": "70" }
                    }
                }
            }
        ]
    }
};

ddb.batchWriteItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    }
    else {
        console.log("Success", data);
    }
});
// snippet-end:[dynamodb.JavaScript.batch.WriteItem]
