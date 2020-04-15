let nock = require('nock');

module.exports.hash = "995b251f9a73db2d1edd27246f757f99";

module.exports.testInfo = {"uniqueName":{"getConfigTest":"getConfigTest158696680993104244"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigTest158696680993104244', {"key":"getConfigTest158696680993104244","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"mIIIN0UkW2aPlgBRXuPeQcDCndT","key":"getConfigTest158696680993104244","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"mIIIN0UkW2aPlgBRXuPeQcDCndT"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzUx;sn=1902351',
  'x-ms-request-id',
  'c88b1b3e-029c-4e00-ab4a-65e5ccc335d1',
  'x-ms-correlation-request-id',
  'c88b1b3e-029c-4e00-ab4a-65e5ccc335d1',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
