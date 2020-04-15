let nock = require('nock');

module.exports.hash = "605d474792a3cd47f3a9c94c08507539";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907407301626"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907407301626', {"key":"etags158690907407301626","value":"world"})
  .query(true)
  .reply(200, {"etag":"s5rco6WtwP7ox0xxNwWP0Zs6esB","key":"etags158690907407301626","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'ETag',
  '"s5rco6WtwP7ox0xxNwWP0Zs6esB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTI3;sn=1897927',
  'x-ms-request-id',
  '73ef3be9-a759-4fdb-b774-50c8792d7f2e',
  'x-ms-correlation-request-id',
  '73ef3be9-a759-4fdb-b774-50c8792d7f2e',
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
  .put('/kv/etags158690907407301626', {"key":"etags158690907407301626","label":null,"content_type":null,"value":"world","last_modified":"2020-04-15T00:04:34.000Z","tags":{},"etag":"never-match-etag"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'e8d03f58-675e-48f8-b026-cd0f565a26aa',
  'x-ms-correlation-request-id',
  'e8d03f58-675e-48f8-b026-cd0f565a26aa',
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
  .reply(200, {"items":[{"etag":"s5rco6WtwP7ox0xxNwWP0Zs6esB","key":"etags158690907407301626","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:34+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTI3;sn=1897927',
  'x-ms-request-id',
  '1982e80f-c53e-4f20-b844-33cfdc753269',
  'x-ms-correlation-request-id',
  '1982e80f-c53e-4f20-b844-33cfdc753269',
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
  .delete('/kv/etags158690907407301626')
  .query(true)
  .reply(200, {"etag":"s5rco6WtwP7ox0xxNwWP0Zs6esB","key":"etags158690907407301626","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'ETag',
  '"s5rco6WtwP7ox0xxNwWP0Zs6esB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTI4;sn=1897928',
  'x-ms-request-id',
  'c7f5c075-246a-4c43-be25-7299dd6a28a4',
  'x-ms-correlation-request-id',
  'c7f5c075-246a-4c43-be25-7299dd6a28a4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
