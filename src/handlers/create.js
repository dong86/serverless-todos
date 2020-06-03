'use strict';

const uuid = require('uuid');
const dynamodb = require('../utils/dynamodb');

const create = async(event, context) => {
  // 解析post参数
  const { title } = JSON.parse(event.body);
  // 构造todo实例
  const currTime = (new Date()).toISOString();
  const todo = {
    id: uuid.v4(),
    title,
    status: 'new',
    createdAt: currTime,
    updatedAt: currTime,
  };
  
  try {
    // 查看DynamoDB文档 
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    // 插入数据使用put
    // Lambda函数是异步，所以这里配合使用async/await
    await dynamodb.put({
      TableName: 'TodosTable',
      Item: todo
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(todo, null, 2)
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};

module.exports.handler = create;
