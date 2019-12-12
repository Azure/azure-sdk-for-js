let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"":"157618984697508084"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/doesntmatter')
  .query(true)
  .reply(200, {"etag":"APHBiOVQK7e2Yx8bMixUd8I7Xf8","key":"doesntmatter","label":null,"content_type":null,"value":null,"tags":{},"locked":false,"last_modified":"2019-12-12T22:19:02+00:00"}, [
  'Server',
  'openresty/1.15.8.1',
  'Date',
  'Thu, 12 Dec 2019 22:30:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 12 Dec 2019 22:19:02 GMT',
  'ETag',
  '"APHBiOVQK7e2Yx8bMixUd8I7Xf8"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxMzUyNTYw;sn=1352560',
  'x-ms-request-id',
  'dd521f13-8558-4dc6-9e54-766a9e844c88',
  'x-ms-correlation-request-id',
  'dd521f13-8558-4dc6-9e54-766a9e844c88',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Allow-Methods',
  'GET, PUT, POST, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
