let nock = require('nock');

module.exports.hash = "cd397d126d98cb92c867bf868c371784";

module.exports.testInfo = {"uniqueName":{"getConfigTest":"getConfigTest161108422602506352"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigTest161108422602506352', {"key":"getConfigTest161108422602506352","label":"a label","content_type":"a content type","value":"value that will not be retrieved"})
  .query(true)
  .reply(200, {"etag":"xVdhsyXnelW6elltKSNzZhmfVP6","key":"getConfigTest161108422602506352","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":false,"last_modified":"2021-01-19T19:23:46+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 19 Jan 2021 19:23:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 19 Jan 2021 19:23:46 GMT',
  'ETag',
  '"xVdhsyXnelW6elltKSNzZhmfVP6"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NDYyOTU=;sn=3846295',
  'x-ms-request-id',
  'f52a0a72-f8b4-4a27-920e-f4b972261798',
  'x-ms-correlation-request-id',
  'f52a0a72-f8b4-4a27-920e-f4b972261798',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/getConfigTest161108422602506352')
  .query(true)
  .reply(200, {"etag":"Szb8VsdhKTNu2RqbpB4SnEr27Ho","key":"getConfigTest161108422602506352","label":"a label","content_type":"a content type","value":"value that will not be retrieved","tags":{},"locked":true,"last_modified":"2021-01-19T19:23:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 19 Jan 2021 19:25:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 19 Jan 2021 19:23:47 GMT',
  'ETag',
  '"Szb8VsdhKTNu2RqbpB4SnEr27Ho"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NDYyOTY=;sn=3846296',
  'x-ms-request-id',
  'e1cef00e-4955-4068-bd1f-cccc397d45d6',
  'x-ms-correlation-request-id',
  'e1cef00e-4955-4068-bd1f-cccc397d45d6',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/getConfigTest161108422602506352')
  .query(true)
  .reply(200, {"label":"a label","content_type":"a content type","locked":true,"last_modified":"2021-01-19T19:23:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 19 Jan 2021 19:23:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 19 Jan 2021 19:23:47 GMT',
  'ETag',
  '"Szb8VsdhKTNu2RqbpB4SnEr27Ho"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NDYyOTY=;sn=3846296',
  'x-ms-request-id',
  '59179901-d9f7-4aac-af8a-e1e5e3ba56b8',
  'x-ms-correlation-request-id',
  '59179901-d9f7-4aac-af8a-e1e5e3ba56b8',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
