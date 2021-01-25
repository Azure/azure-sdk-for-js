let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'WVegYVLdPUyZtknJC9fLhQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '160ms',
  'X-Azure-Ref',
  '0gSkPYAAAAACWmD9jmAyYSZeb2LXeVe1KWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:40 GMT'
]);
