let nock = require('nock');

module.exports.hash = "cea5dfb5c9d75c2f48ab924def5484c4";

module.exports.testInfo = {"uniqueName":{"setConfigTestNA":"setConfigTestNA158696685567708270"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTestNA158696685567708270', {"key":"setConfigTestNA158696685567708270","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"Q0vqhORvaCEvGCsJXr7NOPK8A2k","key":"setConfigTestNA158696685567708270","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'ETag',
  '"Q0vqhORvaCEvGCsJXr7NOPK8A2k"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODM0;sn=1902834',
  'x-ms-request-id',
  'e2b41b5a-a78b-4f2e-af95-bc913d0a81d9',
  'x-ms-correlation-request-id',
  'e2b41b5a-a78b-4f2e-af95-bc913d0a81d9',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
