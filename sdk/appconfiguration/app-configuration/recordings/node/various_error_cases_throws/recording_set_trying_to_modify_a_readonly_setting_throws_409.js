let nock = require('nock');

module.exports.hash = "42448b7207fc21dcd8db389f3e952087";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696685707809283"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696685707809283', {"key":"etags158696685707809283","value":"world"})
  .query(true)
  .reply(200, {"etag":"rUCYLHPRWiIau8c4r2DvcPE3Wsk","key":"etags158696685707809283","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'ETag',
  '"rUCYLHPRWiIau8c4r2DvcPE3Wsk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQx;sn=1902841',
  'x-ms-request-id',
  '817491ae-50b6-47e3-9318-6373e869f134',
  'x-ms-correlation-request-id',
  '817491ae-50b6-47e3-9318-6373e869f134',
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
  .put('/locks/etags158696685707809283')
  .query(true)
  .reply(200, {"etag":"qN6lfGnQbRZ6KRv8rU1oLzDzNq2","key":"etags158696685707809283","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:07:37+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'ETag',
  '"qN6lfGnQbRZ6KRv8rU1oLzDzNq2"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQy;sn=1902842',
  'x-ms-request-id',
  'c21c2386-2ea9-4eed-931d-e9166551b7a1',
  'x-ms-correlation-request-id',
  'c21c2386-2ea9-4eed-931d-e9166551b7a1',
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
  .put('/kv/etags158696685707809283', {"key":"etags158696685707809283","label":null,"content_type":null,"value":"world","last_modified":"2020-04-15T16:07:37.000Z","tags":{},"etag":"rUCYLHPRWiIau8c4r2DvcPE3Wsk"})
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'etags158696685707809283' is not allowed","name":"etags158696685707809283","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '23e32020-777e-4a25-a1d3-681c4b116596',
  'x-ms-correlation-request-id',
  '23e32020-777e-4a25-a1d3-681c4b116596',
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
  .reply(200, {"items":[{"etag":"qN6lfGnQbRZ6KRv8rU1oLzDzNq2","key":"etags158696685707809283","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:07:37+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQy;sn=1902842',
  'x-ms-request-id',
  '9d7ae5cc-4f06-4ca3-858a-3af2286c4f67',
  'x-ms-correlation-request-id',
  '9d7ae5cc-4f06-4ca3-858a-3af2286c4f67',
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
  .delete('/locks/etags158696685707809283')
  .query(true)
  .reply(200, {"etag":"SRZaL8orrGZd3r4H3OyOBZIyB2W","key":"etags158696685707809283","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"SRZaL8orrGZd3r4H3OyOBZIyB2W"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQz;sn=1902843',
  'x-ms-request-id',
  '100073c2-dd07-4e5c-a6a8-67cb3a4e804b',
  'x-ms-correlation-request-id',
  '100073c2-dd07-4e5c-a6a8-67cb3a4e804b',
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
  .delete('/kv/etags158696685707809283')
  .query(true)
  .reply(200, {"etag":"SRZaL8orrGZd3r4H3OyOBZIyB2W","key":"etags158696685707809283","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"SRZaL8orrGZd3r4H3OyOBZIyB2W"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ0;sn=1902844',
  'x-ms-request-id',
  '027761bb-24eb-4b80-993a-1d67cae4bd24',
  'x-ms-correlation-request-id',
  '027761bb-24eb-4b80-993a-1d67cae4bd24',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
