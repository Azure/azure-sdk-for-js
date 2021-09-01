let nock = require('nock');

module.exports.hash = "c923c157e4f22a44bd939a63c8b3378a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', "hello")
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 01 Sep 2021 19:52:35 GMT',
  'Content-Length',
  '0'
]);

nock('rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', {"x":1,"y":2})
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 01 Sep 2021 19:52:35 GMT',
  'Content-Length',
  '0'
]);

nock('rp-endpoint:443', {"encodedQueryParams":true})
  .post('/api/hubs/simplechat/:send', "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000")
  .query(true)
  .reply(202, "", [
  'Cache-Control',
  'private',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 01 Sep 2021 19:52:35 GMT',
  'Content-Length',
  '0'
]);
