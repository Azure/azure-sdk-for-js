let nock = require('nock');

module.exports.hash = "49df23b7338f070e6ab730c33f2fce58";

module.exports.testInfo = {"uniqueName":{"deleteConfigTest":"deleteConfigTest158696680824504084"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTest158696680824504084', {"key":"deleteConfigTest158696680824504084","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"IdC1L9YEwmuqFs9bL8aADzBzGMu","key":"deleteConfigTest158696680824504084","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'ETag',
  '"IdC1L9YEwmuqFs9bL8aADzBzGMu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQy;sn=1902342',
  'x-ms-request-id',
  '98487a62-5032-4130-b3fb-746bfea68bcb',
  'x-ms-correlation-request-id',
  '98487a62-5032-4130-b3fb-746bfea68bcb',
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
  .delete('/kv/deleteConfigTest158696680824504084')
  .query(true)
  .reply(200, {"etag":"IdC1L9YEwmuqFs9bL8aADzBzGMu","key":"deleteConfigTest158696680824504084","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'ETag',
  '"IdC1L9YEwmuqFs9bL8aADzBzGMu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQz;sn=1902343',
  'x-ms-request-id',
  '840b294b-4798-4061-a99a-f34d23f7bf5d',
  'x-ms-correlation-request-id',
  '840b294b-4798-4061-a99a-f34d23f7bf5d',
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
  .get('/kv/deleteConfigTest158696680824504084')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'aefce900-571f-4362-b4a8-f372695712df',
  'x-ms-correlation-request-id',
  'aefce900-571f-4362-b4a8-f372695712df',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
