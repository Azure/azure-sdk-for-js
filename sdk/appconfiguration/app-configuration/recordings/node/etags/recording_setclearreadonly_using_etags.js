let nock = require('nock');

module.exports.hash = "ea69502b00f7236bbabb13d4949c21d2";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690902139908890"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690902139908890', {"key":"etags158690902139908890","value":"some value"})
  .query(true)
  .reply(200, {"etag":"1gJhKy3sEMDOIGg5MNLigJjQzto","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"1gJhKy3sEMDOIGg5MNLigJjQzto"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA4;sn=1897408',
  'x-ms-request-id',
  '2bf2cce2-65cb-4766-a7d5-bbff1bfb80e7',
  'x-ms-correlation-request-id',
  '2bf2cce2-65cb-4766-a7d5-bbff1bfb80e7',
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
  .get('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"1gJhKy3sEMDOIGg5MNLigJjQzto","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"1gJhKy3sEMDOIGg5MNLigJjQzto"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA4;sn=1897408',
  'x-ms-request-id',
  '87647856-249a-4300-845c-20865f930e9f',
  'x-ms-correlation-request-id',
  '87647856-249a-4300-845c-20865f930e9f',
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
  .put('/locks/etags158690902139908890')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '6828ce41-27e8-48f9-9304-be9e8806e264',
  'x-ms-correlation-request-id',
  '6828ce41-27e8-48f9-9304-be9e8806e264',
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
  .get('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"1gJhKy3sEMDOIGg5MNLigJjQzto","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"1gJhKy3sEMDOIGg5MNLigJjQzto"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA4;sn=1897408',
  'x-ms-request-id',
  '4cea4d9f-bf16-439e-ba18-4ddea19a4cca',
  'x-ms-correlation-request-id',
  '4cea4d9f-bf16-439e-ba18-4ddea19a4cca',
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
  .put('/locks/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"lu4Ju80mVWf2p998cNtQPsluYJP","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"lu4Ju80mVWf2p998cNtQPsluYJP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA5;sn=1897409',
  'x-ms-request-id',
  '802d451b-98d7-4e38-901b-39a88aaac29e',
  'x-ms-correlation-request-id',
  '802d451b-98d7-4e38-901b-39a88aaac29e',
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
  .get('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"lu4Ju80mVWf2p998cNtQPsluYJP","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"lu4Ju80mVWf2p998cNtQPsluYJP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA5;sn=1897409',
  'x-ms-request-id',
  'daf49e7d-8c42-4d11-8f36-15e67823ffd4',
  'x-ms-correlation-request-id',
  'daf49e7d-8c42-4d11-8f36-15e67823ffd4',
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
  .delete('/locks/etags158690902139908890')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '8865944a-6d94-41a7-adda-e0c688334dc7',
  'x-ms-correlation-request-id',
  '8865944a-6d94-41a7-adda-e0c688334dc7',
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
  .get('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"lu4Ju80mVWf2p998cNtQPsluYJP","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"lu4Ju80mVWf2p998cNtQPsluYJP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA5;sn=1897409',
  'x-ms-request-id',
  '700e89ee-b388-4d00-822a-122b2a3e9fa4',
  'x-ms-correlation-request-id',
  '700e89ee-b388-4d00-822a-122b2a3e9fa4',
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
  .delete('/locks/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"JbvCjMOTZgMJPh39JgqLeXSlDmW","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"JbvCjMOTZgMJPh39JgqLeXSlDmW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDEw;sn=1897410',
  'x-ms-request-id',
  'e94bef64-8f18-427c-9087-0799dbbe5ea3',
  'x-ms-correlation-request-id',
  'e94bef64-8f18-427c-9087-0799dbbe5ea3',
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
  .get('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"JbvCjMOTZgMJPh39JgqLeXSlDmW","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"JbvCjMOTZgMJPh39JgqLeXSlDmW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDEw;sn=1897410',
  'x-ms-request-id',
  'bd4ce921-74e6-4119-b87e-c154ffa3953e',
  'x-ms-correlation-request-id',
  'bd4ce921-74e6-4119-b87e-c154ffa3953e',
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
  .reply(200, {"items":[{"etag":"JbvCjMOTZgMJPh39JgqLeXSlDmW","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:42+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDEw;sn=1897410',
  'x-ms-request-id',
  '656cc434-84e7-479d-afeb-00121b4ec856',
  'x-ms-correlation-request-id',
  '656cc434-84e7-479d-afeb-00121b4ec856',
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
  .delete('/kv/etags158690902139908890')
  .query(true)
  .reply(200, {"etag":"JbvCjMOTZgMJPh39JgqLeXSlDmW","key":"etags158690902139908890","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:42 GMT',
  'ETag',
  '"JbvCjMOTZgMJPh39JgqLeXSlDmW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDEx;sn=1897411',
  'x-ms-request-id',
  '6649e95d-75de-48e8-bca8-a25795c30276',
  'x-ms-correlation-request-id',
  '6649e95d-75de-48e8-bca8-a25795c30276',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
