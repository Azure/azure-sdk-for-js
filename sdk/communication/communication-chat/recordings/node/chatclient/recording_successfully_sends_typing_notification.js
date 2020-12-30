let nock = require('nock');

module.exports.hash = "dbe5b264c11dbef1d4f15779defd44e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A9f956fe210414cc3a38295c399294c02%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'lbcbxALLq0mLPtFBg4jvcQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '380ms',
  'X-Azure-Ref',
  '0R+LsXwAAAABedgjnVrbbTqzuvkM9MBySWVZSMzBFREdFMDMxMgBjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
  'Date',
  'Wed, 30 Dec 2020 20:25:44 GMT',
  'Content-Length',
  '0'
]);
