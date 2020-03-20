let nock = require('nock');

module.exports.hash = "43ed35cb7b064452ea4f77f82c97cddb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/ws/api/v1/hubs/simplechat/users/brian', "hello")
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
  .post('/ws/api/v1/hubs/simplechat/users/brian', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
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
