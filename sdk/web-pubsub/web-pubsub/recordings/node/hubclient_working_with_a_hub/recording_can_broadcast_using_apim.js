let nock = require('nock');

module.exports.hash = "0714e865f61706d44a3577daa5410c7e";

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
  'Tue, 31 Aug 2021 18:15:55 GMT',
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
  'Tue, 31 Aug 2021 18:15:55 GMT',
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
  'Tue, 31 Aug 2021 18:15:55 GMT',
  'Content-Length',
  '0'
]);
