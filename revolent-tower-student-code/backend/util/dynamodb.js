const { EC2MetadataCredentials } = require("aws-sdk");
const AWS = require("aws-sdk");
const { REGION } = require("./config");

AWS.config.update({
  region: REGION,
});

AWS.config.credentials = new EC2MetadataCredentials();

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;
