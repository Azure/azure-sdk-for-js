let nock = require('nock');

module.exports.hash = "05689a19bc83c96b578d4a08a811d84b";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696680151108584"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696680151108584', {"key":"etags158696680151108584","value":"some value"})
  .query(true)
  .reply(200, {"etag":"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ","key":"etags158696680151108584","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEz;sn=1902313',
  'x-ms-request-id',
  '60007291-2b8d-4dbd-8b10-fd1367f4bc79',
  'x-ms-correlation-request-id',
  '60007291-2b8d-4dbd-8b10-fd1367f4bc79',
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
  .get('/kv/etags158696680151108584')
  .query(true)
  .reply(200, {"etag":"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ","key":"etags158696680151108584","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEz;sn=1902313',
  'x-ms-request-id',
  '5f3c9654-215f-4b7b-98d8-dfed2fcb5c28',
  'x-ms-correlation-request-id',
  '5f3c9654-215f-4b7b-98d8-dfed2fcb5c28',
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
  .put('/kv/etags158696680151108584', {"key":"etags158696680151108584","label":null,"content_type":null,"value":"sneaky user updated the field","last_modified":"2020-04-15T16:06:42.000Z","tags":{},"etag":"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ"})
  .query(true)
  .reply(200, {"etag":"wQi1isMU0RCZWFBVoEKXq0NzVay","key":"etags158696680151108584","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"wQi1isMU0RCZWFBVoEKXq0NzVay"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE0;sn=1902314',
  'x-ms-request-id',
  'fc8b9433-d5d1-43d5-acd2-b7cf864afc85',
  'x-ms-correlation-request-id',
  'fc8b9433-d5d1-43d5-acd2-b7cf864afc85',
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
  .put('/kv/etags158696680151108584', {"key":"etags158696680151108584","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T16:06:42.000Z","tags":{},"etag":"aQ2ta9Cb8V0l0l8YsLtLeQ6cbaZ"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'ac736b1d-fd0f-4174-8ac0-480615c220ac',
  'x-ms-correlation-request-id',
  'ac736b1d-fd0f-4174-8ac0-480615c220ac',
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
  .reply(200, {"items":[{"etag":"wQi1isMU0RCZWFBVoEKXq0NzVay","key":"etags158696680151108584","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE0;sn=1902314',
  'x-ms-request-id',
  '3fead159-5a1f-43e5-98ea-2b331056fe20',
  'x-ms-correlation-request-id',
  '3fead159-5a1f-43e5-98ea-2b331056fe20',
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
  .delete('/kv/etags158696680151108584')
  .query(true)
  .reply(200, {"etag":"wQi1isMU0RCZWFBVoEKXq0NzVay","key":"etags158696680151108584","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"wQi1isMU0RCZWFBVoEKXq0NzVay"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE1;sn=1902315',
  'x-ms-request-id',
  '96b0f96f-ffbf-46de-92e4-49fd9806e7de',
  'x-ms-correlation-request-id',
  '96b0f96f-ffbf-46de-92e4-49fd9806e7de',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
