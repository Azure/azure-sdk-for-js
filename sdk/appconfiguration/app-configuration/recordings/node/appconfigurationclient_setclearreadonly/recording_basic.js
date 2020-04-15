let nock = require('nock');

module.exports.hash = "d478d9dfc1daaea13d3c9ac632d6fa87";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158690902348504836"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158690902348504836', {"key":"readOnlyTests158690902348504836","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"LNvT5j0w4yxvUjyw71LX6kskTj7","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"LNvT5j0w4yxvUjyw71LX6kskTj7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE0;sn=1897414',
  'x-ms-request-id',
  '3ae0e1b5-677d-4aa0-8523-355c3cb5c2f9',
  'x-ms-correlation-request-id',
  '3ae0e1b5-677d-4aa0-8523-355c3cb5c2f9',
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
  .get('/kv/readOnlyTests158690902348504836')
  .query(true)
  .reply(200, {"etag":"LNvT5j0w4yxvUjyw71LX6kskTj7","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"LNvT5j0w4yxvUjyw71LX6kskTj7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE0;sn=1897414',
  'x-ms-request-id',
  '01b8bd53-80d9-4952-bc4a-09af8889ceae',
  'x-ms-correlation-request-id',
  '01b8bd53-80d9-4952-bc4a-09af8889ceae',
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
  .put('/locks/readOnlyTests158690902348504836')
  .query(true)
  .reply(200, {"etag":"fpsK475phDjZagakHF1IOlEcCpG","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"fpsK475phDjZagakHF1IOlEcCpG"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE1;sn=1897415',
  'x-ms-request-id',
  'ed613f6d-feab-40c1-8779-b2c83e3ff250',
  'x-ms-correlation-request-id',
  'ed613f6d-feab-40c1-8779-b2c83e3ff250',
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
  .get('/kv/readOnlyTests158690902348504836')
  .query(true)
  .reply(200, {"etag":"fpsK475phDjZagakHF1IOlEcCpG","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"fpsK475phDjZagakHF1IOlEcCpG"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE1;sn=1897415',
  'x-ms-request-id',
  '8f6d6391-436e-415e-8780-fbabd156ad55',
  'x-ms-correlation-request-id',
  '8f6d6391-436e-415e-8780-fbabd156ad55',
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
  .put('/kv/readOnlyTests158690902348504836', {"key":"readOnlyTests158690902348504836","label":"some label","value":"world"})
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158690902348504836' is not allowed","name":"readOnlyTests158690902348504836","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '01a7e732-80be-4ca9-85da-a7ccaf8d37a0',
  'x-ms-correlation-request-id',
  '01a7e732-80be-4ca9-85da-a7ccaf8d37a0',
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
  .delete('/kv/readOnlyTests158690902348504836')
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158690902348504836' is not allowed","name":"readOnlyTests158690902348504836","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  'dc4594e4-40c6-4de2-9666-f306b212d358',
  'x-ms-correlation-request-id',
  'dc4594e4-40c6-4de2-9666-f306b212d358',
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
  .reply(200, {"items":[{"etag":"fpsK475phDjZagakHF1IOlEcCpG","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:44+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE1;sn=1897415',
  'x-ms-request-id',
  'a9e261eb-5a63-4a86-b65e-17b6287c280f',
  'x-ms-correlation-request-id',
  'a9e261eb-5a63-4a86-b65e-17b6287c280f',
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
  .delete('/locks/readOnlyTests158690902348504836')
  .query(true)
  .reply(200, {"etag":"ucDq96SAI881YHPfj3GTOBy9ocA","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"ucDq96SAI881YHPfj3GTOBy9ocA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE2;sn=1897416',
  'x-ms-request-id',
  'd0da4c7e-2c57-4248-99b9-15483cd9dc65',
  'x-ms-correlation-request-id',
  'd0da4c7e-2c57-4248-99b9-15483cd9dc65',
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
  .delete('/kv/readOnlyTests158690902348504836')
  .query(true)
  .reply(200, {"etag":"ucDq96SAI881YHPfj3GTOBy9ocA","key":"readOnlyTests158690902348504836","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'ETag',
  '"ucDq96SAI881YHPfj3GTOBy9ocA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE3;sn=1897417',
  'x-ms-request-id',
  '893ae890-b554-4a48-81ca-aaf6e25d02e9',
  'x-ms-correlation-request-id',
  '893ae890-b554-4a48-81ca-aaf6e25d02e9',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
