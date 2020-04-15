let nock = require('nock');

module.exports.hash = "42448b7207fc21dcd8db389f3e952087";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907446507578"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907446507578', {"key":"etags158690907446507578","value":"world"})
  .query(true)
  .reply(200, {"etag":"u0AjMoztqPxUic4yDCyWb1d4dkf","key":"etags158690907446507578","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"u0AjMoztqPxUic4yDCyWb1d4dkf"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTI5;sn=1897929',
  'x-ms-request-id',
  '3a8ab603-7dd6-41fc-b77a-03cdc827f3f1',
  'x-ms-correlation-request-id',
  '3a8ab603-7dd6-41fc-b77a-03cdc827f3f1',
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
  .put('/locks/etags158690907446507578')
  .query(true)
  .reply(200, {"etag":"yrwg7ED68rsgjGFfQOsco60Ujyx","key":"etags158690907446507578","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"yrwg7ED68rsgjGFfQOsco60Ujyx"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTMw;sn=1897930',
  'x-ms-request-id',
  '6cc53809-5ade-4b95-ad63-4ecab10c0c71',
  'x-ms-correlation-request-id',
  '6cc53809-5ade-4b95-ad63-4ecab10c0c71',
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
  .put('/kv/etags158690907446507578', {"key":"etags158690907446507578","label":null,"content_type":null,"value":"world","last_modified":"2020-04-15T00:04:35.000Z","tags":{},"etag":"u0AjMoztqPxUic4yDCyWb1d4dkf"})
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'etags158690907446507578' is not allowed","name":"etags158690907446507578","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '112f30d7-5ddf-4342-b0e0-4efdb3d5ab63',
  'x-ms-correlation-request-id',
  '112f30d7-5ddf-4342-b0e0-4efdb3d5ab63',
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
  .reply(200, {"items":[{"etag":"yrwg7ED68rsgjGFfQOsco60Ujyx","key":"etags158690907446507578","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:04:35+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTMw;sn=1897930',
  'x-ms-request-id',
  '8632258b-751b-4170-90c4-095242dd6aad',
  'x-ms-correlation-request-id',
  '8632258b-751b-4170-90c4-095242dd6aad',
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
  .delete('/locks/etags158690907446507578')
  .query(true)
  .reply(200, {"etag":"bXpjRwR0MJG08s4useTOBNDOkq7","key":"etags158690907446507578","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"bXpjRwR0MJG08s4useTOBNDOkq7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTMx;sn=1897931',
  'x-ms-request-id',
  '93bddea5-18d4-42a5-923b-d34fc1ab5bce',
  'x-ms-correlation-request-id',
  '93bddea5-18d4-42a5-923b-d34fc1ab5bce',
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
  .delete('/kv/etags158690907446507578')
  .query(true)
  .reply(200, {"etag":"bXpjRwR0MJG08s4useTOBNDOkq7","key":"etags158690907446507578","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"bXpjRwR0MJG08s4useTOBNDOkq7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTMy;sn=1897932',
  'x-ms-request-id',
  '9ade17a0-c6cf-4902-bd1b-3f18cf4dc405',
  'x-ms-correlation-request-id',
  '9ade17a0-c6cf-4902-bd1b-3f18cf4dc405',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
