let nock = require('nock');

module.exports.hash = "524230183ef5ac1648a893b86c89020c";

module.exports.testInfo = {"uniqueName":{"listConfigSetting3A":"listConfigSetting3A158696681369001058","listConfigSetting3B":"listConfigSetting3B158696681369005066","listConfigSettingsLabel":"listConfigSettingsLabel158696681369001749"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting3A158696681369001058', {"key":"listConfigSetting3A158696681369001058","label":"listConfigSettingsLabel158696681369001749","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"wb7LIqYPgZKe8OpLrQBFRcVOHot","key":"listConfigSetting3A158696681369001058","label":"listConfigSettingsLabel158696681369001749","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'ETag',
  '"wb7LIqYPgZKe8OpLrQBFRcVOHot"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY5;sn=1902369',
  'x-ms-request-id',
  'c6391ff0-0ada-441b-996e-8a350ea7c8e9',
  'x-ms-correlation-request-id',
  'c6391ff0-0ada-441b-996e-8a350ea7c8e9',
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
  .put('/locks/listConfigSetting3A158696681369001058')
  .query(true)
  .reply(200, {"etag":"N7pJlVuStgkRdFmkrEVDCI7dGKE","key":"listConfigSetting3A158696681369001058","label":"listConfigSettingsLabel158696681369001749","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'ETag',
  '"N7pJlVuStgkRdFmkrEVDCI7dGKE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcw;sn=1902370',
  'x-ms-request-id',
  'f5755863-2a8a-47a4-ac4e-5f7c6a42f7d7',
  'x-ms-correlation-request-id',
  'f5755863-2a8a-47a4-ac4e-5f7c6a42f7d7',
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
  .put('/kv/listConfigSetting3A158696681369001058', {"key":"listConfigSetting3A158696681369001058","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"jBjAtjnm30onVGMZH9Kqr4h6n0Z","key":"listConfigSetting3A158696681369001058","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'ETag',
  '"jBjAtjnm30onVGMZH9Kqr4h6n0Z"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcx;sn=1902371',
  'x-ms-request-id',
  'db4a5db3-281b-460c-9d1a-3d148de2d2b6',
  'x-ms-correlation-request-id',
  'db4a5db3-281b-460c-9d1a-3d148de2d2b6',
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
  .put('/kv/listConfigSetting3B158696681369005066', {"key":"listConfigSetting3B158696681369005066","label":"listConfigSettingsLabel158696681369001749","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"nR2NzPqYUDnHr5DQX0f6hNEeMNK","key":"listConfigSetting3B158696681369005066","label":"listConfigSettingsLabel158696681369001749","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'ETag',
  '"nR2NzPqYUDnHr5DQX0f6hNEeMNK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcy;sn=1902372',
  'x-ms-request-id',
  '8698181d-18a9-4c22-8ff4-24f347c74b7b',
  'x-ms-correlation-request-id',
  '8698181d-18a9-4c22-8ff4-24f347c74b7b',
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
  .put('/kv/listConfigSetting3B158696681369005066', {"key":"listConfigSetting3B158696681369005066","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"VojoHnum98T9zGDmarGWj9e8mq8","key":"listConfigSetting3B158696681369005066","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'ETag',
  '"VojoHnum98T9zGDmarGWj9e8mq8"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcz;sn=1902373',
  'x-ms-request-id',
  'd2457f78-1ac0-4f78-9b4f-cc19434bb291',
  'x-ms-correlation-request-id',
  'd2457f78-1ac0-4f78-9b4f-cc19434bb291',
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
  .reply(200, {"items":[{"etag":"jBjAtjnm30onVGMZH9Kqr4h6n0Z","key":"listConfigSetting3A158696681369001058","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"},{"etag":"N7pJlVuStgkRdFmkrEVDCI7dGKE","key":"listConfigSetting3A158696681369001058","label":"listConfigSettingsLabel158696681369001749","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:54+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcz;sn=1902373',
  'x-ms-request-id',
  'f068c12e-8173-41cf-b691-8814063632b7',
  'x-ms-correlation-request-id',
  'f068c12e-8173-41cf-b691-8814063632b7',
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
  .reply(200, {"items":[{"etag":"jBjAtjnm30onVGMZH9Kqr4h6n0Z","key":"listConfigSetting3A158696681369001058","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:54+00:00"},{"etag":"N7pJlVuStgkRdFmkrEVDCI7dGKE","key":"listConfigSetting3A158696681369001058","label":"listConfigSettingsLabel158696681369001749","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:54+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzcz;sn=1902373',
  'x-ms-request-id',
  'b88bbf3e-f799-42f0-9ad7-2e4a2a9238b4',
  'x-ms-correlation-request-id',
  'b88bbf3e-f799-42f0-9ad7-2e4a2a9238b4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
