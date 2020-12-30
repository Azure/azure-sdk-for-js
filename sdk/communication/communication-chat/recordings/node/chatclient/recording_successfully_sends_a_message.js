let nock = require('nock');

module.exports.hash = "44a1a3fb76689a98de0cbdfbe9b12da6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/messages', {"content":"content"})
  .query(true)
  .reply(201, {"id":"1609359943675"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Location',
  'https://168.61.22.92/chat/threads/19%3A9f956fe210414cc3a38295c399294c02@thread.v2/messages/1609359943675',
  'MS-CV',
  'h7Izi+G2eUqv7QxQS+sbWA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '400ms',
  'X-Azure-Ref',
  '0R+LsXwAAAAAp3KvtdKFGQ6MSXgIXO7TdWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:43 GMT'
]);
