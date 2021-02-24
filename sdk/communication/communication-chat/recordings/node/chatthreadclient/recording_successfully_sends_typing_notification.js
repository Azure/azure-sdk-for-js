let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad1799fdf7b8b4f5e96675f30c01296e1%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'WNuHuCBA4EO7edmMFEP9Ig.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '366ms',
  'X-Azure-Ref',
  '0UFccYAAAAACkx4qFKw+/T6APj4SxQRy1WVZSMzBFREdFMDMwOQBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Thu, 04 Feb 2021 20:21:36 GMT',
  'Content-Length',
  '0'
]);
