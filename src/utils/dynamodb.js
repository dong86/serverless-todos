'use strict';

const AWS = require('aws-sdk');
// 实例化DynamoDB客户端
// 开发环境下选择localhost
// 线上使用IAM role
let options = {};
if(process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  }
}
const dynamodb = new AWS.DynamoDB.DocumentClient(options);

module.exports = dynamodb;