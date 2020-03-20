let nock = require('nock');

module.exports.hash = "98332b7ac386774e6c57fc5cada2ddca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:05:22 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
