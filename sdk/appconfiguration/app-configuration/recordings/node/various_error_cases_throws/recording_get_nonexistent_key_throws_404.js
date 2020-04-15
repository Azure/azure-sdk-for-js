let nock = require('nock');

module.exports.hash = "c7f2f8dfe5475136213aecfec24db9fd";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907318900103"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907318900103', {"key":"etags158690907318900103","value":"world"})
  .query(true)
  .reply(200, {"etag":"kO5r8dOx6g706Xg6CzVCagEBXoT","key":"etags158690907318900103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"kO5r8dOx6g706Xg6CzVCagEBXoT"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTIz;sn=1897923',
  'x-ms-request-id',
  '84a8fb87-3ada-4e43-a7ab-43bf78b57caa',
  'x-ms-correlation-request-id',
  '84a8fb87-3ada-4e43-a7ab-43bf78b57caa',
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
  .get('/kv/non-existent%20key%20etags158690907318900103')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'b98e35f5-f3dc-4833-a0d1-b149c95ef6d7',
  'x-ms-correlation-request-id',
  'b98e35f5-f3dc-4833-a0d1-b149c95ef6d7',
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
  .reply(200, {"items":[{"etag":"kO5r8dOx6g706Xg6CzVCagEBXoT","key":"etags158690907318900103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTIz;sn=1897923',
  'x-ms-request-id',
  'da8a8d0e-f6ab-4a23-9931-020e03ad3873',
  'x-ms-correlation-request-id',
  'da8a8d0e-f6ab-4a23-9931-020e03ad3873',
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
  .delete('/kv/etags158690907318900103')
  .query(true)
  .reply(200, {"etag":"kO5r8dOx6g706Xg6CzVCagEBXoT","key":"etags158690907318900103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"kO5r8dOx6g706Xg6CzVCagEBXoT"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTI0;sn=1897924',
  'x-ms-request-id',
  '921c486b-e037-4324-9519-056f72cbeab6',
  'x-ms-correlation-request-id',
  '921c486b-e037-4324-9519-056f72cbeab6',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
