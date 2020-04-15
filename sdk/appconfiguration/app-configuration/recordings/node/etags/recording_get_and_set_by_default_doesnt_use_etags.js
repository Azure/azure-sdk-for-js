let nock = require('nock');

module.exports.hash = "0656b616c78721ec26ad252863f7fe7e";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696679966407384"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696679966407384', {"key":"etags158696679966407384","value":"some value"})
  .query(true)
  .reply(200, {"etag":"qDyvRext51gMwnKP9AO40Tv2fP7","key":"etags158696679966407384","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'ETag',
  '"qDyvRext51gMwnKP9AO40Tv2fP7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzA3;sn=1902307',
  'x-ms-request-id',
  '28f5c66c-e991-421a-b114-b31b570d2eb1',
  'x-ms-correlation-request-id',
  '28f5c66c-e991-421a-b114-b31b570d2eb1',
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
  .get('/kv/etags158696679966407384')
  .query(true)
  .reply(200, {"etag":"qDyvRext51gMwnKP9AO40Tv2fP7","key":"etags158696679966407384","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'ETag',
  '"qDyvRext51gMwnKP9AO40Tv2fP7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzA3;sn=1902307',
  'x-ms-request-id',
  'c8e5b652-dd6c-4e85-9662-b3b438cce5e5',
  'x-ms-correlation-request-id',
  'c8e5b652-dd6c-4e85-9662-b3b438cce5e5',
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
  .put('/kv/etags158696679966407384', {"key":"etags158696679966407384","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T16:06:40.000Z","tags":{},"etag":"qDyvRext51gMwnKP9AO40Tv2fP7"})
  .query(true)
  .reply(200, {"etag":"wOKa3dt5F0DKwA6Ry8Huq6s1iLA","key":"etags158696679966407384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'ETag',
  '"wOKa3dt5F0DKwA6Ry8Huq6s1iLA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzA4;sn=1902308',
  'x-ms-request-id',
  '67579b52-8802-424b-959f-fcfb97eb1173',
  'x-ms-correlation-request-id',
  '67579b52-8802-424b-959f-fcfb97eb1173',
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
  .reply(200, {"items":[{"etag":"wOKa3dt5F0DKwA6Ry8Huq6s1iLA","key":"etags158696679966407384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:40+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzA4;sn=1902308',
  'x-ms-request-id',
  'd6fa086f-11da-4353-95dc-fcb8ef5832a9',
  'x-ms-correlation-request-id',
  'd6fa086f-11da-4353-95dc-fcb8ef5832a9',
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
  .delete('/kv/etags158696679966407384')
  .query(true)
  .reply(200, {"etag":"wOKa3dt5F0DKwA6Ry8Huq6s1iLA","key":"etags158696679966407384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'ETag',
  '"wOKa3dt5F0DKwA6Ry8Huq6s1iLA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzA5;sn=1902309',
  'x-ms-request-id',
  '4fd8df4a-0891-40ae-aa71-6f46ca94e3d8',
  'x-ms-correlation-request-id',
  '4fd8df4a-0891-40ae-aa71-6f46ca94e3d8',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
