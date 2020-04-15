let nock = require('nock');

module.exports.hash = "3dbe8e8e500cdaaa3994843e70416e0a";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696680441602402"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696680441602402', {"key":"etags158696680441602402","value":"some value"})
  .query(true)
  .reply(200, {"etag":"xPw2268iM1X2sHg0CiEn2a65ot1","key":"etags158696680441602402","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"xPw2268iM1X2sHg0CiEn2a65ot1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI0;sn=1902324',
  'x-ms-request-id',
  'c86bbfb0-d025-4009-9250-11d49ab6f74a',
  'x-ms-correlation-request-id',
  'c86bbfb0-d025-4009-9250-11d49ab6f74a',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158696680441602402')
  .query(true)
  .reply(200, {"etag":"xPw2268iM1X2sHg0CiEn2a65ot1","key":"etags158696680441602402","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"xPw2268iM1X2sHg0CiEn2a65ot1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI0;sn=1902324',
  'x-ms-request-id',
  '7e5c724d-76f2-4aac-a69c-0dc6fe578dde',
  'x-ms-correlation-request-id',
  '7e5c724d-76f2-4aac-a69c-0dc6fe578dde',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/etags158696680441602402')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '928d655b-c3c2-483f-bdbc-265a109d9306',
  'x-ms-correlation-request-id',
  '928d655b-c3c2-483f-bdbc-265a109d9306',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158696680441602402')
  .query(true)
  .reply(200, {"etag":"xPw2268iM1X2sHg0CiEn2a65ot1","key":"etags158696680441602402","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"xPw2268iM1X2sHg0CiEn2a65ot1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI0;sn=1902324',
  'x-ms-request-id',
  '69079d12-7a29-4e9c-b577-b331679915d5',
  'x-ms-correlation-request-id',
  '69079d12-7a29-4e9c-b577-b331679915d5',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/etags158696680441602402')
  .query(true)
  .reply(200, {"etag":"xPw2268iM1X2sHg0CiEn2a65ot1","key":"etags158696680441602402","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"xPw2268iM1X2sHg0CiEn2a65ot1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI1;sn=1902325',
  'x-ms-request-id',
  '071cf582-ff2e-4c49-8479-0c28c1819b07',
  'x-ms-correlation-request-id',
  '071cf582-ff2e-4c49-8479-0c28c1819b07',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158696680441602402')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'f40af9ec-9cfa-4570-9baa-993927442adf',
  'x-ms-correlation-request-id',
  'f40af9ec-9cfa-4570-9baa-993927442adf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '0118fdb5-2128-4f9d-b9ba-476566dd9cb7',
  'x-ms-correlation-request-id',
  '0118fdb5-2128-4f9d-b9ba-476566dd9cb7',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
