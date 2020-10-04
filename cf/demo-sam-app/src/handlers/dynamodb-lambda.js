const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = function(event, context, callback) {

    var params = {
        TableName: 'CUSTOMER_LIST',

        Item: {
            'CUSTOMER_ID': event.id,
            'CUSTOMER_NAME': event.name,
            'DAYS_OF_TRAINING': event.daysoftraining
        }
    };

    console.info('event information:id ' + event.id + 'event.name=' + event.name);

    docClient.put(params, function(err, data) {

        if (err) {
            console.log("Error", err);

        }
        else {
            console.log("Success", data);

        }
    });

    callback(null, "message");


}
