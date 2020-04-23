let nock = require('nock');

module.exports.hash = "2c662f64b79a617553d2961a4107356e";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189652606358"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189652606358', {"key":"etags158700189652606358","value":"some value"})
  .query(true)
  .reply(200, {"etag":"6inx0Wtdek0M3Qr0HENxKvI2GzL","key":"etags158700189652606358","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'ETag',
  '"6inx0Wtdek0M3Qr0HENxKvI2GzL"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODIx;sn=1904821',
  'x-ms-request-id',
  '671e58cf-02c5-40e2-9955-8a3fdb403618',
  'x-ms-correlation-request-id',
  '671e58cf-02c5-40e2-9955-8a3fdb403618',
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
  .get('/kv/etags158700189652606358')
  .query(true)
  .reply(200, {"etag":"6inx0Wtdek0M3Qr0HENxKvI2GzL","key":"etags158700189652606358","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'ETag',
  '"6inx0Wtdek0M3Qr0HENxKvI2GzL"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODIx;sn=1904821',
  'x-ms-request-id',
  '974f6b11-4a87-4421-92b8-995be60ab249',
  'x-ms-correlation-request-id',
  '974f6b11-4a87-4421-92b8-995be60ab249',
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
  .delete('/kv/etags158700189652606358')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '120fca7f-b70b-4938-a25a-82329c9e45e4',
  'x-ms-correlation-request-id',
  '120fca7f-b70b-4938-a25a-82329c9e45e4',
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
  .get('/kv/etags158700189652606358')
  .query(true)
  .reply(200, {"etag":"6inx0Wtdek0M3Qr0HENxKvI2GzL","key":"etags158700189652606358","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'ETag',
  '"6inx0Wtdek0M3Qr0HENxKvI2GzL"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODIx;sn=1904821',
  'x-ms-request-id',
  '54a4c493-8edf-4657-9e76-a7b41e1653d9',
  'x-ms-correlation-request-id',
  '54a4c493-8edf-4657-9e76-a7b41e1653d9',
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
  .delete('/kv/etags158700189652606358')
  .query(true)
  .reply(200, {"etag":"6inx0Wtdek0M3Qr0HENxKvI2GzL","key":"etags158700189652606358","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'ETag',
  '"6inx0Wtdek0M3Qr0HENxKvI2GzL"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODIy;sn=1904822',
  'x-ms-request-id',
  '77b6fe85-3d28-429c-8fe9-57eca95586c4',
  'x-ms-correlation-request-id',
  '77b6fe85-3d28-429c-8fe9-57eca95586c4',
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
  .get('/kv/etags158700189652606358')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '48b3f4c7-ae8a-46cf-ab3d-e081388ed479',
  'x-ms-correlation-request-id',
  '48b3f4c7-ae8a-46cf-ab3d-e081388ed479',
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
  'Thu, 16 Apr 2020 01:51:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '260932de-a0cb-47b5-acf6-62d1e221f1da',
  'x-ms-correlation-request-id',
  '260932de-a0cb-47b5-acf6-62d1e221f1da',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
