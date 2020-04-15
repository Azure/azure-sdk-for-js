let nock = require('nock');

module.exports.hash = "8f7e3d87ac7e8132e5055e76091ff2f0";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696684862009565","list-revisions-A":"list-revisions-A158696684862004944","list-revisions-B":"list-revisions-B158696684862003379"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696684862009565', {"key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"MJArt4I80XE1UcJCPc2dyt2EeRK","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:29+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:29 GMT',
  'ETag',
  '"MJArt4I80XE1UcJCPc2dyt2EeRK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEy;sn=1902812',
  'x-ms-request-id',
  '9910362b-bfec-41df-b10a-e7ab921dee57',
  'x-ms-correlation-request-id',
  '9910362b-bfec-41df-b10a-e7ab921dee57',
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
  .put('/kv/listRevisions158696684862009565', {"key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"ImH5KTEhB7pOlAX8vcPN5cos9rb","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'ETag',
  '"ImH5KTEhB7pOlAX8vcPN5cos9rb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEz;sn=1902813',
  'x-ms-request-id',
  '44acc5eb-abc5-411c-83d3-037e44bda829',
  'x-ms-correlation-request-id',
  '44acc5eb-abc5-411c-83d3-037e44bda829',
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
  .put('/kv/listRevisions158696684862009565', {"key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"Q4DQZvplvZRJq4E0wrfN2nNXS7Z","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'ETag',
  '"Q4DQZvplvZRJq4E0wrfN2nNXS7Z"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE0;sn=1902814',
  'x-ms-request-id',
  '02b7687a-08e4-4804-a337-98c9da2db0a0',
  'x-ms-correlation-request-id',
  '02b7687a-08e4-4804-a337-98c9da2db0a0',
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
  .put('/kv/listRevisions158696684862009565', {"key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"SOGtXeAAifCWzy27V8bRnV9emkR","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'ETag',
  '"SOGtXeAAifCWzy27V8bRnV9emkR"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE1;sn=1902815',
  'x-ms-request-id',
  '6526983d-537b-46f9-b27b-05d544c123ca',
  'x-ms-correlation-request-id',
  '6526983d-537b-46f9-b27b-05d544c123ca',
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
  .reply(200, {"items":[{"etag":"SOGtXeAAifCWzy27V8bRnV9emkR","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"Q4DQZvplvZRJq4E0wrfN2nNXS7Z","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"ImH5KTEhB7pOlAX8vcPN5cos9rb","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"MJArt4I80XE1UcJCPc2dyt2EeRK","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:29+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE1;sn=1902815',
  'x-ms-request-id',
  '8cf219b1-9f80-4162-a3e9-73c095f6c041',
  'x-ms-correlation-request-id',
  '8cf219b1-9f80-4162-a3e9-73c095f6c041',
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
  .reply(200, {"items":[{"etag":"SOGtXeAAifCWzy27V8bRnV9emkR","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"Q4DQZvplvZRJq4E0wrfN2nNXS7Z","key":"listRevisions158696684862009565","label":"list-revisions-B158696684862003379","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"ImH5KTEhB7pOlAX8vcPN5cos9rb","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"},{"etag":"MJArt4I80XE1UcJCPc2dyt2EeRK","key":"listRevisions158696684862009565","label":"list-revisions-A158696684862004944","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:29+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE1;sn=1902815',
  'x-ms-request-id',
  '81f6332f-0b6f-4521-bff2-0a9477ce51bf',
  'x-ms-correlation-request-id',
  '81f6332f-0b6f-4521-bff2-0a9477ce51bf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
