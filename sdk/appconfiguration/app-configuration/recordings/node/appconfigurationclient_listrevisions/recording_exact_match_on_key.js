let nock = require('nock');

module.exports.hash = "b2df591adf1b063fcf862f97e8be9e3e";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690906602805166","list-revisions-A":"list-revisions-A158690906602802680","list-revisions-B":"list-revisions-B158690906602806797"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690906602805166', {"key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"tIuliYuvjjbvWahHSFweM96XQPW","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'ETag',
  '"tIuliYuvjjbvWahHSFweM96XQPW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAw;sn=1897900',
  'x-ms-request-id',
  'db2b9280-fbb0-454a-95c9-a4a7f6f19670',
  'x-ms-correlation-request-id',
  'db2b9280-fbb0-454a-95c9-a4a7f6f19670',
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
  .put('/kv/listRevisions158690906602805166', {"key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"C74Hmzys9UxMOlVaPgcfR6Lv7Iy","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'ETag',
  '"C74Hmzys9UxMOlVaPgcfR6Lv7Iy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAx;sn=1897901',
  'x-ms-request-id',
  'defaa1d9-6cdd-460d-8fa2-f24c8205b547',
  'x-ms-correlation-request-id',
  'defaa1d9-6cdd-460d-8fa2-f24c8205b547',
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
  .put('/kv/listRevisions158690906602805166', {"key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"003yfmOqPlYZbGRuPlVyo8OSbhj","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'ETag',
  '"003yfmOqPlYZbGRuPlVyo8OSbhj"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAy;sn=1897902',
  'x-ms-request-id',
  '4624fdfd-0975-46d6-8e6b-f5e0751dc050',
  'x-ms-correlation-request-id',
  '4624fdfd-0975-46d6-8e6b-f5e0751dc050',
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
  .put('/kv/listRevisions158690906602805166', {"key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"K2lNiCJ5c7J6JnpyHrlfkHOl5Cm","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'ETag',
  '"K2lNiCJ5c7J6JnpyHrlfkHOl5Cm"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAz;sn=1897903',
  'x-ms-request-id',
  '0b182f87-372b-4686-90fa-453e2a633a6f',
  'x-ms-correlation-request-id',
  '0b182f87-372b-4686-90fa-453e2a633a6f',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"K2lNiCJ5c7J6JnpyHrlfkHOl5Cm","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"003yfmOqPlYZbGRuPlVyo8OSbhj","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"C74Hmzys9UxMOlVaPgcfR6Lv7Iy","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"tIuliYuvjjbvWahHSFweM96XQPW","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAz;sn=1897903',
  'x-ms-request-id',
  '4cf888ce-73b9-455a-8792-a6d854542e35',
  'x-ms-correlation-request-id',
  '4cf888ce-73b9-455a-8792-a6d854542e35',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"K2lNiCJ5c7J6JnpyHrlfkHOl5Cm","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"003yfmOqPlYZbGRuPlVyo8OSbhj","key":"listRevisions158690906602805166","label":"list-revisions-B158690906602806797","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"C74Hmzys9UxMOlVaPgcfR6Lv7Iy","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:27+00:00"},{"etag":"tIuliYuvjjbvWahHSFweM96XQPW","key":"listRevisions158690906602805166","label":"list-revisions-A158690906602802680","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTAz;sn=1897903',
  'x-ms-request-id',
  '9fba38c0-01fe-41b4-b606-f7f08ade0912',
  'x-ms-correlation-request-id',
  '9fba38c0-01fe-41b4-b606-f7f08ade0912',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
