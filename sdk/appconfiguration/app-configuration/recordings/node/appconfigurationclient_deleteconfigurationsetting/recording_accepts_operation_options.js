let nock = require('nock');

module.exports.hash = "9cd9f4e5d559531a3c64d5f6f532d222";

module.exports.testInfo = {"uniqueName":{"deleteConfigTest":"deleteConfigTest158696680936403964"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTest158696680936403964', {"key":"deleteConfigTest158696680936403964","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"wloL2w0AzEZXhZbWKmwX3HVWDfa","key":"deleteConfigTest158696680936403964","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:49+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'ETag',
  '"wloL2w0AzEZXhZbWKmwX3HVWDfa"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ4;sn=1902348',
  'x-ms-request-id',
  'ce4286e7-5211-4ab3-86e2-f03308517a03',
  'x-ms-correlation-request-id',
  'ce4286e7-5211-4ab3-86e2-f03308517a03',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
