let nock = require('nock');

module.exports.hash = "71ae618c02b1a3abb2bc19443fbfbf1c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 20 Oct 2021 18:53:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 20 Oct 2021 18:53:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 20 Oct 2021 18:53:20 GMT',
  'Content-Length',
  '0'
]);
