const uuid = require("uuid");
const AWS = require("aws-sdk");
const UserTable = process.env.USER_TABLE

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const {title} = JSON.parse(event.body);
  const timestamp = new Date();
  const params = {
    TableName: UserTable,
    Item: {
      id: uuid.v1(),
      title: title,
      status: "OPEN",
      createdAt: timestamp.toISOString(),
    },
  };
  dynamoDb.put(params, (err) => {
    if (err) {
      console.log(err);
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
