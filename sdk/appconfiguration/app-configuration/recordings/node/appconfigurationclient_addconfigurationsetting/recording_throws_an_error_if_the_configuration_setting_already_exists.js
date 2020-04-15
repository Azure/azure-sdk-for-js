let nock = require('nock');

module.exports.hash = "77a5615dcac152d1ed00cc0fb76eb101";

module.exports.testInfo = {"uniqueName":{"addConfigTestTwice":"addConfigTestTwice158696680790203067"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigTestTwice158696680790203067', {"key":"addConfigTestTwice158696680790203067","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"9sRrNoIxSW3w79rweH98nW4Xp50","key":"addConfigTestTwice158696680790203067","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
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
  '"9sRrNoIxSW3w79rweH98nW4Xp50"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQw;sn=1902340',
  'x-ms-request-id',
  '5b3fd1fc-4aa2-4b38-808a-d2642255a1d9',
  'x-ms-correlation-request-id',
  '5b3fd1fc-4aa2-4b38-808a-d2642255a1d9',
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
  .put('/kv/addConfigTestTwice158696680790203067', {"key":"addConfigTestTwice158696680790203067","label":"test","value":"foo"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'ca856f34-ec49-4864-9425-2c6fc15abfd3',
  'x-ms-correlation-request-id',
  'ca856f34-ec49-4864-9425-2c6fc15abfd3',
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
  .delete('/kv/addConfigTestTwice158696680790203067')
  .query(true)
  .reply(200, {"etag":"9sRrNoIxSW3w79rweH98nW4Xp50","key":"addConfigTestTwice158696680790203067","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
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
  '"9sRrNoIxSW3w79rweH98nW4Xp50"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQx;sn=1902341',
  'x-ms-request-id',
  '2325697e-a9be-4f05-b48e-4cd55e4c4e98',
  'x-ms-correlation-request-id',
  '2325697e-a9be-4f05-b48e-4cd55e4c4e98',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
