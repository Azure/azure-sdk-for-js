let nock = require('nock');

module.exports.hash = "ea69502b00f7236bbabb13d4949c21d2";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696680309004946"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696680309004946', {"key":"etags158696680309004946","value":"some value"})
  .query(true)
  .reply(200, {"etag":"9uky5s4FF31b2xGWXOoGiBAj7Il","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"9uky5s4FF31b2xGWXOoGiBAj7Il"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIw;sn=1902320',
  'x-ms-request-id',
  'b76f8d1c-d1fd-4e80-8650-29964ffbacf4',
  'x-ms-correlation-request-id',
  'b76f8d1c-d1fd-4e80-8650-29964ffbacf4',
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
  .get('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"9uky5s4FF31b2xGWXOoGiBAj7Il","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"9uky5s4FF31b2xGWXOoGiBAj7Il"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIw;sn=1902320',
  'x-ms-request-id',
  '79feec01-f473-4173-b024-bd3be03cbfaa',
  'x-ms-correlation-request-id',
  '79feec01-f473-4173-b024-bd3be03cbfaa',
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
  .put('/locks/etags158696680309004946')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '7bf0151a-652e-4b57-94af-f752854c1846',
  'x-ms-correlation-request-id',
  '7bf0151a-652e-4b57-94af-f752854c1846',
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
  .get('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"9uky5s4FF31b2xGWXOoGiBAj7Il","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"9uky5s4FF31b2xGWXOoGiBAj7Il"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIw;sn=1902320',
  'x-ms-request-id',
  'c80c8cf4-c65e-4be2-befd-97687d3bd3df',
  'x-ms-correlation-request-id',
  'c80c8cf4-c65e-4be2-befd-97687d3bd3df',
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
  .put('/locks/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"VkXgttF6H631Vi1Jgf016ZSuxER","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"VkXgttF6H631Vi1Jgf016ZSuxER"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIx;sn=1902321',
  'x-ms-request-id',
  'fa972b0b-034b-4a37-a842-10fe6861de65',
  'x-ms-correlation-request-id',
  'fa972b0b-034b-4a37-a842-10fe6861de65',
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
  .get('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"VkXgttF6H631Vi1Jgf016ZSuxER","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"VkXgttF6H631Vi1Jgf016ZSuxER"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIx;sn=1902321',
  'x-ms-request-id',
  'b4550f2e-ad49-488b-b116-e1acfbd552dd',
  'x-ms-correlation-request-id',
  'b4550f2e-ad49-488b-b116-e1acfbd552dd',
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
  .delete('/locks/etags158696680309004946')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'cc62a1d1-4b3c-4a78-84c0-120d90689f6a',
  'x-ms-correlation-request-id',
  'cc62a1d1-4b3c-4a78-84c0-120d90689f6a',
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
  .get('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"VkXgttF6H631Vi1Jgf016ZSuxER","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"VkXgttF6H631Vi1Jgf016ZSuxER"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIx;sn=1902321',
  'x-ms-request-id',
  '632ca474-b2d0-45f4-8f40-90d918f6e938',
  'x-ms-correlation-request-id',
  '632ca474-b2d0-45f4-8f40-90d918f6e938',
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
  .delete('/locks/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"9e1BWC244oeg2KBvwnWqVD5Clfb","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"9e1BWC244oeg2KBvwnWqVD5Clfb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIy;sn=1902322',
  'x-ms-request-id',
  'd61fca5b-919a-42d1-8eda-6b914c3916dc',
  'x-ms-correlation-request-id',
  'd61fca5b-919a-42d1-8eda-6b914c3916dc',
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
  .get('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"9e1BWC244oeg2KBvwnWqVD5Clfb","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"9e1BWC244oeg2KBvwnWqVD5Clfb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIy;sn=1902322',
  'x-ms-request-id',
  '3751a255-8713-4149-81df-df71a6034575',
  'x-ms-correlation-request-id',
  '3751a255-8713-4149-81df-df71a6034575',
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
  .reply(200, {"items":[{"etag":"9e1BWC244oeg2KBvwnWqVD5Clfb","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIy;sn=1902322',
  'x-ms-request-id',
  '53704e58-e2ca-41da-8c4a-17c97a5b1b0a',
  'x-ms-correlation-request-id',
  '53704e58-e2ca-41da-8c4a-17c97a5b1b0a',
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
  .delete('/kv/etags158696680309004946')
  .query(true)
  .reply(200, {"etag":"9e1BWC244oeg2KBvwnWqVD5Clfb","key":"etags158696680309004946","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:44+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:44 GMT',
  'ETag',
  '"9e1BWC244oeg2KBvwnWqVD5Clfb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzIz;sn=1902323',
  'x-ms-request-id',
  '3933d429-04d4-4220-8695-4632222a297f',
  'x-ms-correlation-request-id',
  '3933d429-04d4-4220-8695-4632222a297f',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
