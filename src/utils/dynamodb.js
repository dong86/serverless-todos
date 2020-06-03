'use strict';

const AWS = require('aws-sdk');
// 实例化DynamoDB客户端
// 开发环境下选择localhost
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

module.exports = dynamodb;