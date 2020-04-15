let nock = require('nock');

module.exports.hash = "10a2e898a21e5c023aea7cafe559f037";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690906936701784","list-revisions-A":"list-revisions-A158690906936709061","list-revisions-B":"list-revisions-B158690906936705731"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690906936701784', {"key":"listRevisions158690906936701784","label":"list-revisions-A158690906936709061","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"fwpGMGjhcCyeKaKAYTY2kDsQx3T","key":"listRevisions158690906936701784","label":"list-revisions-A158690906936709061","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'ETag',
  '"fwpGMGjhcCyeKaKAYTY2kDsQx3T"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA4;sn=1897908',
  'x-ms-request-id',
  '852b2bd6-43aa-4709-a862-e11c198339a4',
  'x-ms-correlation-request-id',
  '852b2bd6-43aa-4709-a862-e11c198339a4',
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
  .put('/kv/listRevisions158690906936701784', {"key":"listRevisions158690906936701784","label":"list-revisions-A158690906936709061","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"U4JWWJaMVpHijhc15FxowdrIhZy","key":"listRevisions158690906936701784","label":"list-revisions-A158690906936709061","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'ETag',
  '"U4JWWJaMVpHijhc15FxowdrIhZy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA5;sn=1897909',
  'x-ms-request-id',
  'cccbf530-df59-4dda-a513-07b00da37f5a',
  'x-ms-correlation-request-id',
  'cccbf530-df59-4dda-a513-07b00da37f5a',
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
  .put('/kv/listRevisions158690906936701784', {"key":"listRevisions158690906936701784","label":"list-revisions-B158690906936705731","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"ljubixEbD0greC9p2S5XfiTydou","key":"listRevisions158690906936701784","label":"list-revisions-B158690906936705731","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'ETag',
  '"ljubixEbD0greC9p2S5XfiTydou"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTEw;sn=1897910',
  'x-ms-request-id',
  'ffc46fdd-77ee-44a6-8209-261ea5aa9489',
  'x-ms-correlation-request-id',
  'ffc46fdd-77ee-44a6-8209-261ea5aa9489',
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
  .put('/kv/listRevisions158690906936701784', {"key":"listRevisions158690906936701784","label":"list-revisions-B158690906936705731","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"IQzR9UHsKTuzJjKnROcQkIgY0UO","key":"listRevisions158690906936701784","label":"list-revisions-B158690906936705731","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'ETag',
  '"IQzR9UHsKTuzJjKnROcQkIgY0UO"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTEx;sn=1897911',
  'x-ms-request-id',
  'ca4d37a2-7c37-46a0-a4d4-2fa69c8454f3',
  'x-ms-correlation-request-id',
  'ca4d37a2-7c37-46a0-a4d4-2fa69c8454f3',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
