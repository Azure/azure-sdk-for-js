let nock = require('nock');

module.exports.hash = "c9b6eb132d2cfb70d44e21d11b90d126";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158696680621002297"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158696680621002297', {"key":"readOnlyTests158696680621002297","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"7x7Ai7Z2qvro39XkNAJyftJ325I","key":"readOnlyTests158696680621002297","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'ETag',
  '"7x7Ai7Z2qvro39XkNAJyftJ325I"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMw;sn=1902330',
  'x-ms-request-id',
  '73ed0da0-9397-4dde-b345-5d8ab5626460',
  'x-ms-correlation-request-id',
  '73ed0da0-9397-4dde-b345-5d8ab5626460',
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
  .get('/kv/readOnlyTests158696680621002297')
  .query(true)
  .reply(200, {"etag":"7x7Ai7Z2qvro39XkNAJyftJ325I","key":"readOnlyTests158696680621002297","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'ETag',
  '"7x7Ai7Z2qvro39XkNAJyftJ325I"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMw;sn=1902330',
  'x-ms-request-id',
  '7dda111e-548b-4906-8763-33ef1a70a9c7',
  'x-ms-correlation-request-id',
  '7dda111e-548b-4906-8763-33ef1a70a9c7',
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
  .reply(200, {"items":[{"etag":"7x7Ai7Z2qvro39XkNAJyftJ325I","key":"readOnlyTests158696680621002297","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMw;sn=1902330',
  'x-ms-request-id',
  '8668735f-e7d1-4f26-bbd3-23b8f452e3f5',
  'x-ms-correlation-request-id',
  '8668735f-e7d1-4f26-bbd3-23b8f452e3f5',
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
  .delete('/kv/readOnlyTests158696680621002297')
  .query(true)
  .reply(200, {"etag":"7x7Ai7Z2qvro39XkNAJyftJ325I","key":"readOnlyTests158696680621002297","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'ETag',
  '"7x7Ai7Z2qvro39XkNAJyftJ325I"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMx;sn=1902331',
  'x-ms-request-id',
  '831e18be-cf16-4708-9892-6de9cdedf318',
  'x-ms-correlation-request-id',
  '831e18be-cf16-4708-9892-6de9cdedf318',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
