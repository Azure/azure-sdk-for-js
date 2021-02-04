let nock = require('nock');

module.exports.hash = "68f698ad1cd68fb5d2031b79d0a1fd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:46849534-eb08-4ab7-bde7-c36928cd1547_00000008-0e96-ace2-b0b7-3a3a0d0000a8","chatMessageId":"1612470096086","readOn":"2021-02-04T20:21:36Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'stZNnI5EjEG/ItQPFCwbjQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '253ms',
  'X-Azure-Ref',
  '0VFccYAAAAADgLgquQNuOR5pWOOKTKmJEWVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:40 GMT'
]);
