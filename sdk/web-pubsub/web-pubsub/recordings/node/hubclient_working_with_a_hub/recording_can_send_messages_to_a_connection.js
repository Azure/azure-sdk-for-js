let nock = require('nock');

module.exports.hash = "d18b60f21bdfb0f2333ef1453393d6b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/connections/xxxx/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Date',
  'Wed, 20 Oct 2021 18:53:20 GMT',
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
  'Wed, 20 Oct 2021 18:53:20 GMT',
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
  'Wed, 20 Oct 2021 18:53:20 GMT',
  'Content-Length',
  '0',
  'Connection',
  'keep-alive',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
