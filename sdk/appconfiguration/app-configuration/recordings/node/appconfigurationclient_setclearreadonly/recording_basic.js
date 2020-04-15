let nock = require('nock');

module.exports.hash = "d478d9dfc1daaea13d3c9ac632d6fa87";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158696680518906460"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158696680518906460', {"key":"readOnlyTests158696680518906460","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"7Ga27V9yQLCp2TmvmwSxXlVCMXr","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'ETag',
  '"7Ga27V9yQLCp2TmvmwSxXlVCMXr"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI2;sn=1902326',
  'x-ms-request-id',
  '60cd4ecc-50ca-4baf-9524-081df5ac967a',
  'x-ms-correlation-request-id',
  '60cd4ecc-50ca-4baf-9524-081df5ac967a',
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
  .get('/kv/readOnlyTests158696680518906460')
  .query(true)
  .reply(200, {"etag":"7Ga27V9yQLCp2TmvmwSxXlVCMXr","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'ETag',
  '"7Ga27V9yQLCp2TmvmwSxXlVCMXr"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI2;sn=1902326',
  'x-ms-request-id',
  '38ff1a5e-791a-46f7-b239-6bf01438bf2f',
  'x-ms-correlation-request-id',
  '38ff1a5e-791a-46f7-b239-6bf01438bf2f',
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
  .put('/locks/readOnlyTests158696680518906460')
  .query(true)
  .reply(200, {"etag":"0f7KBWhQ5Ghr5d6TOoo3Qrbdxcn","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'ETag',
  '"0f7KBWhQ5Ghr5d6TOoo3Qrbdxcn"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI3;sn=1902327',
  'x-ms-request-id',
  'a79a3668-6f1d-46ed-8f4d-568238a9656e',
  'x-ms-correlation-request-id',
  'a79a3668-6f1d-46ed-8f4d-568238a9656e',
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
  .get('/kv/readOnlyTests158696680518906460')
  .query(true)
  .reply(200, {"etag":"0f7KBWhQ5Ghr5d6TOoo3Qrbdxcn","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'ETag',
  '"0f7KBWhQ5Ghr5d6TOoo3Qrbdxcn"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI3;sn=1902327',
  'x-ms-request-id',
  'b6cca638-6c26-4ec9-8d30-26d2834b99ee',
  'x-ms-correlation-request-id',
  'b6cca638-6c26-4ec9-8d30-26d2834b99ee',
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
  .put('/kv/readOnlyTests158696680518906460', {"key":"readOnlyTests158696680518906460","label":"some label","value":"world"})
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158696680518906460' is not allowed","name":"readOnlyTests158696680518906460","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  'd4bd927e-3ae7-4147-b462-45f3216ca4ac',
  'x-ms-correlation-request-id',
  'd4bd927e-3ae7-4147-b462-45f3216ca4ac',
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
  .delete('/kv/readOnlyTests158696680518906460')
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158696680518906460' is not allowed","name":"readOnlyTests158696680518906460","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  'fee674a3-a597-4219-80cc-ffa0c576e378',
  'x-ms-correlation-request-id',
  'fee674a3-a597-4219-80cc-ffa0c576e378',
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
  .reply(200, {"items":[{"etag":"0f7KBWhQ5Ghr5d6TOoo3Qrbdxcn","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:45+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI3;sn=1902327',
  'x-ms-request-id',
  '64da687b-e3b8-4151-9ad8-57940e93a56c',
  'x-ms-correlation-request-id',
  '64da687b-e3b8-4151-9ad8-57940e93a56c',
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
  .delete('/locks/readOnlyTests158696680518906460')
  .query(true)
  .reply(200, {"etag":"tAJ8tJ2HmIoGWjjJnNGP2PSHnh9","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}, [
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
  '"tAJ8tJ2HmIoGWjjJnNGP2PSHnh9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI4;sn=1902328',
  'x-ms-request-id',
  'a4d9098c-2cdd-42ea-873b-f5d07452ef1e',
  'x-ms-correlation-request-id',
  'a4d9098c-2cdd-42ea-873b-f5d07452ef1e',
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
  .delete('/kv/readOnlyTests158696680518906460')
  .query(true)
  .reply(200, {"etag":"tAJ8tJ2HmIoGWjjJnNGP2PSHnh9","key":"readOnlyTests158696680518906460","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:46+00:00"}, [
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
  '"tAJ8tJ2HmIoGWjjJnNGP2PSHnh9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzI5;sn=1902329',
  'x-ms-request-id',
  'd0a40ead-9624-456e-8371-ef834acea308',
  'x-ms-correlation-request-id',
  'd0a40ead-9624-456e-8371-ef834acea308',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
