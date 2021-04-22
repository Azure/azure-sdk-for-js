let nock = require('nock');

module.exports.hash = "19d7ca7001ec0d7074cedccf7611af01";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/connections/xxxx/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:15 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/connections/xxxx/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:15 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/connections/xxxx/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:15 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
