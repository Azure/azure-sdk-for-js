let nock = require('nock');

module.exports.hash = "17ae51cb0ae9ccd366954dc480374439";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696684522206616","list-revisions-A":"list-revisions-A158696684522203494","list-revisions-B":"list-revisions-B158696684522200290"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696684522206616', {"key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"Z56Jgoks5UBBf5U5cnJTgA6k8v3","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:25+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:25 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:25 GMT',
  'ETag',
  '"Z56Jgoks5UBBf5U5cnJTgA6k8v3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA0;sn=1902804',
  'x-ms-request-id',
  '4eab103a-a4d5-4791-90da-40990eb93c17',
  'x-ms-correlation-request-id',
  '4eab103a-a4d5-4791-90da-40990eb93c17',
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
  .put('/kv/listRevisions158696684522206616', {"key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"y8yNyonVjNrO9wDHSxRiYqYhS6Q","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:26+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'ETag',
  '"y8yNyonVjNrO9wDHSxRiYqYhS6Q"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA1;sn=1902805',
  'x-ms-request-id',
  '6cf977b1-6164-4aa8-a18c-49066c3a5248',
  'x-ms-correlation-request-id',
  '6cf977b1-6164-4aa8-a18c-49066c3a5248',
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
  .put('/kv/listRevisions158696684522206616', {"key":"listRevisions158696684522206616","label":"list-revisions-B158696684522200290","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"siFAKT7oKvaeTxMJvPoNAIK2EPE","key":"listRevisions158696684522206616","label":"list-revisions-B158696684522200290","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:27 GMT',
  'ETag',
  '"siFAKT7oKvaeTxMJvPoNAIK2EPE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA2;sn=1902806',
  'x-ms-request-id',
  '8614b1a2-dae2-4e24-a91d-a08b140dcb79',
  'x-ms-correlation-request-id',
  '8614b1a2-dae2-4e24-a91d-a08b140dcb79',
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
  .put('/kv/listRevisions158696684522206616', {"key":"listRevisions158696684522206616","label":"list-revisions-B158696684522200290","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"yltjcfjjc0p6FSSKlc4CyCg9yfr","key":"listRevisions158696684522206616","label":"list-revisions-B158696684522200290","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:27 GMT',
  'ETag',
  '"yltjcfjjc0p6FSSKlc4CyCg9yfr"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA3;sn=1902807',
  'x-ms-request-id',
  '46fa3aa4-986d-4107-9bd5-47cd9be5cffb',
  'x-ms-correlation-request-id',
  '46fa3aa4-986d-4107-9bd5-47cd9be5cffb',
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
  .reply(200, {"items":[{"etag":"y8yNyonVjNrO9wDHSxRiYqYhS6Q","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:26+00:00"},{"etag":"Z56Jgoks5UBBf5U5cnJTgA6k8v3","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:25+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA3;sn=1902807',
  'x-ms-request-id',
  '7fc763f2-c4d4-4719-baa8-a9ec4e6ff048',
  'x-ms-correlation-request-id',
  '7fc763f2-c4d4-4719-baa8-a9ec4e6ff048',
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
  .reply(200, {"items":[{"etag":"y8yNyonVjNrO9wDHSxRiYqYhS6Q","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:26+00:00"},{"etag":"Z56Jgoks5UBBf5U5cnJTgA6k8v3","key":"listRevisions158696684522206616","label":"list-revisions-A158696684522203494","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:25+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA3;sn=1902807',
  'x-ms-request-id',
  'e158a887-3b0f-44ec-acad-cfda8940b1d3',
  'x-ms-correlation-request-id',
  'e158a887-3b0f-44ec-acad-cfda8940b1d3',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
