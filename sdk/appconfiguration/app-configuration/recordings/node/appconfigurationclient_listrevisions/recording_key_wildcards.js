let nock = require('nock');

module.exports.hash = "c2665bbe5743b71f20c822f7b753958b";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696685029208628","list-revisions-A":"list-revisions-A158696685029200163","list-revisions-B":"list-revisions-B158696685029200502"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696685029208628', {"key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"p9Dm3Op3IrCdwgomNni88902oU2","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}, [
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
  '"p9Dm3Op3IrCdwgomNni88902oU2"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE2;sn=1902816',
  'x-ms-request-id',
  '95e2e991-9fc3-4f04-8624-8659bb9f2ad4',
  'x-ms-correlation-request-id',
  '95e2e991-9fc3-4f04-8624-8659bb9f2ad4',
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
  .put('/kv/listRevisions158696685029208628', {"key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"Xd8XBOvSoU8CzLmNWZxa1VaZlXB","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:31+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'ETag',
  '"Xd8XBOvSoU8CzLmNWZxa1VaZlXB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE3;sn=1902817',
  'x-ms-request-id',
  '3c8ed6ff-27c9-4c2f-83d9-525c65650031',
  'x-ms-correlation-request-id',
  '3c8ed6ff-27c9-4c2f-83d9-525c65650031',
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
  .put('/kv/listRevisions158696685029208628', {"key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"kZLCLTyfgCXTZQijzFPe2OTqp2q","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:32 GMT',
  'ETag',
  '"kZLCLTyfgCXTZQijzFPe2OTqp2q"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE4;sn=1902818',
  'x-ms-request-id',
  '47490116-fb3e-4371-97f4-cb2f53e53f8d',
  'x-ms-correlation-request-id',
  '47490116-fb3e-4371-97f4-cb2f53e53f8d',
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
  .put('/kv/listRevisions158696685029208628', {"key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"88G6q7gcW3mprN9LjGcOZBzwjUV","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:32 GMT',
  'ETag',
  '"88G6q7gcW3mprN9LjGcOZBzwjUV"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE5;sn=1902819',
  'x-ms-request-id',
  '3e1e4d1c-62bd-4c63-9c57-b55b6bd03d44',
  'x-ms-correlation-request-id',
  '3e1e4d1c-62bd-4c63-9c57-b55b6bd03d44',
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
  .reply(200, {"items":[{"etag":"88G6q7gcW3mprN9LjGcOZBzwjUV","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"},{"etag":"kZLCLTyfgCXTZQijzFPe2OTqp2q","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"},{"etag":"Xd8XBOvSoU8CzLmNWZxa1VaZlXB","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:31+00:00"},{"etag":"p9Dm3Op3IrCdwgomNni88902oU2","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE5;sn=1902819',
  'x-ms-request-id',
  'b479b76a-6637-47e8-adaa-1e97382181ae',
  'x-ms-correlation-request-id',
  'b479b76a-6637-47e8-adaa-1e97382181ae',
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
  .reply(200, {"items":[{"etag":"88G6q7gcW3mprN9LjGcOZBzwjUV","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"},{"etag":"kZLCLTyfgCXTZQijzFPe2OTqp2q","key":"listRevisions158696685029208628","label":"list-revisions-B158696685029200502","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"},{"etag":"Xd8XBOvSoU8CzLmNWZxa1VaZlXB","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:31+00:00"},{"etag":"p9Dm3Op3IrCdwgomNni88902oU2","key":"listRevisions158696685029208628","label":"list-revisions-A158696685029200163","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:30+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODE5;sn=1902819',
  'x-ms-request-id',
  'cd95ad20-b3bd-4aeb-b96a-06e10feb737a',
  'x-ms-correlation-request-id',
  'cd95ad20-b3bd-4aeb-b96a-06e10feb737a',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
