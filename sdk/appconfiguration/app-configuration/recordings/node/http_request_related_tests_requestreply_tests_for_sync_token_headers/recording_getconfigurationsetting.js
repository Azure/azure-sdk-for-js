let nock = require('nock');

module.exports.hash = "71969c9f6ff250f2bc107d7465f44f51";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/doesntmatter')
  .query(true)
  .reply(200, {"etag":"Eow4pfZNUSYoVPr11ZznrLNRXLo","key":"doesntmatter","label":null,"content_type":null,"value":null,"tags":{},"locked":false,"last_modified":"2020-04-15T16:11:16+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:11:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:11:16 GMT',
  'ETag',
  '"Eow4pfZNUSYoVPr11ZznrLNRXLo"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODU0;sn=1902854',
  'x-ms-request-id',
  '60fd0327-9aef-49ed-87ec-37217c2a9f01',
  'x-ms-correlation-request-id',
  '60fd0327-9aef-49ed-87ec-37217c2a9f01',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
