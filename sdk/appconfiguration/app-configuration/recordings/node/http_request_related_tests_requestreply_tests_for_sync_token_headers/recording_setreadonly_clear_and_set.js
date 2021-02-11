let nock = require('nock');

module.exports.hash = "56de1c037d791e0db22ab1a202e4ed65";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/doesntmatter')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:11:16 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'daf80720-b989-44c4-bb5d-f63c5751d0e4',
  'x-ms-correlation-request-id',
  'daf80720-b989-44c4-bb5d-f63c5751d0e4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
