let nock = require('nock');

module.exports.hash = "7d4a6b29e98741782844e5771e5cffe5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:13 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:13 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/groups/group/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Date',
  'Thu, 22 Apr 2021 16:33:13 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
