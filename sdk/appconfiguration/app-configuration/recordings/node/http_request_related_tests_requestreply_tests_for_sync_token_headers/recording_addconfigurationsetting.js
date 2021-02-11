let nock = require('nock');

module.exports.hash = "43214bf6a873e6d5c4c65db50c2634ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/doesntmatter', {"key":"doesntmatter"})
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
  '78e8e5a8-9d80-4d5d-aa2b-746377c31e1c',
  'x-ms-correlation-request-id',
  '78e8e5a8-9d80-4d5d-aa2b-746377c31e1c',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
