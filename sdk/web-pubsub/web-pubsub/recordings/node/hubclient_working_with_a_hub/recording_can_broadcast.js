let nock = require('nock');

module.exports.hash = "af5f1240612c617a65abcec596f671bb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat', "hello")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:34 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:34 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
