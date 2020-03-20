let nock = require('nock');

module.exports.hash = "187a963cb634808670402393c76a7682";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat/groups/group', "hello")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:32 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat/groups/group', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .reply(202, "", [
  'Date',
  'Mon, 11 May 2020 21:55:32 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
