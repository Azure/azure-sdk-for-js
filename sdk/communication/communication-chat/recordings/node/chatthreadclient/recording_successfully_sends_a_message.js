let nock = require('nock');

module.exports.hash = "397e36863f23efcd229d410a33dcc37f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1612470096086"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://chat-sdktester-e2e.int.communication.azure.net/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1@thread.v2/messages/1612470096086',
  'MS-CV',
  'ziWgfeQj002ddxpsri3srg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '720ms',
  'X-Azure-Ref',
  '0T1ccYAAAAABhrMENArV0Q6DNFgbP40rDWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:35 GMT'
]);
