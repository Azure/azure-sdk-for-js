let nock = require('nock');

module.exports.hash = "a77d228b6b443b2f94c3987f26ac6769";

module.exports.testInfo = {"uniqueName":{"listConfigSetting5A":"listConfigSetting5A161110361705808128","listConfigSetting5B":"listConfigSetting5B161110361705904485","listConfigSettingsLabel":"listConfigSettingsLabel161110361705903095"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5A161110361705808128', {"key":"listConfigSetting5A161110361705808128","label":"listConfigSettingsLabel161110361705903095","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"gZFox7MfUiKUzQcNqfa9sK4QoVp","key":"listConfigSetting5A161110361705808128","label":"listConfigSettingsLabel161110361705903095","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:57+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:07 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:57 GMT',
  'ETag',
  '"gZFox7MfUiKUzQcNqfa9sK4QoVp"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTk=;sn=3852719',
  'x-ms-request-id',
  '02f82cef-af7d-4321-9b69-03500485e8bc',
  'x-ms-correlation-request-id',
  '02f82cef-af7d-4321-9b69-03500485e8bc',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/listConfigSetting5A161110361705808128')
  .query(true)
  .reply(200, {"etag":"0AnJCS7NmwYPfze8fGHYFZcwQle","key":"listConfigSetting5A161110361705808128","label":"listConfigSettingsLabel161110361705903095","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:58+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:00 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:58 GMT',
  'ETag',
  '"0AnJCS7NmwYPfze8fGHYFZcwQle"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjA=;sn=3852720',
  'x-ms-request-id',
  '1c9f4321-4359-45a6-b892-7133a7e52b07',
  'x-ms-correlation-request-id',
  '1c9f4321-4359-45a6-b892-7133a7e52b07',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5A161110361705808128', {"key":"listConfigSetting5A161110361705808128","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"fDrxTVRZZ3hwoVXdWpWztiFbdCo","key":"listConfigSetting5A161110361705808128","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:58+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:58 GMT',
  'ETag',
  '"fDrxTVRZZ3hwoVXdWpWztiFbdCo"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjE=;sn=3852721',
  'x-ms-request-id',
  '3291cbb0-0a6a-4233-a0cb-b47bee0f1e62',
  'x-ms-correlation-request-id',
  '3291cbb0-0a6a-4233-a0cb-b47bee0f1e62',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5B161110361705904485', {"key":"listConfigSetting5B161110361705904485","label":"listConfigSettingsLabel161110361705903095","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"kBmGVNZQxzlcl2ugNEmF78hNeVi","key":"listConfigSetting5B161110361705904485","label":"listConfigSettingsLabel161110361705903095","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:58+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:58 GMT',
  'ETag',
  '"kBmGVNZQxzlcl2ugNEmF78hNeVi"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjI=;sn=3852722',
  'x-ms-request-id',
  '3eebcac3-2f5b-4035-93f3-c46f915c929a',
  'x-ms-correlation-request-id',
  '3eebcac3-2f5b-4035-93f3-c46f915c929a',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5B161110361705904485', {"key":"listConfigSetting5B161110361705904485","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"cdZcqpz8neWU2kmWkk0VxjmeiMs","key":"listConfigSetting5B161110361705904485","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:59+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:09 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:59 GMT',
  'ETag',
  '"cdZcqpz8neWU2kmWkk0VxjmeiMs"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjM=;sn=3852723',
  'x-ms-request-id',
  'a4a9d9fb-c469-4b88-a882-2aaa15d4855e',
  'x-ms-correlation-request-id',
  'a4a9d9fb-c469-4b88-a882-2aaa15d4855e',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"label":"listConfigSettingsLabel161110361705903095","content_type":"a content type","locked":true,"last_modified":"2021-01-20T00:46:58+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:02 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjM=;sn=3852723',
  'x-ms-request-id',
  '9b357e0c-9e30-4bc0-ac61-54e325de4153',
  'x-ms-correlation-request-id',
  '9b357e0c-9e30-4bc0-ac61-54e325de4153',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"label":"listConfigSettingsLabel161110361705903095","content_type":"a content type","locked":true,"last_modified":"2021-01-20T00:46:58+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjM=;sn=3852723',
  'x-ms-request-id',
  '2f9560a9-22cd-42e4-81c4-807c95188466',
  'x-ms-correlation-request-id',
  '2f9560a9-22cd-42e4-81c4-807c95188466',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"key":"listConfigSetting5A161110361705808128","label":null,"value":"[A] value"},{"key":"listConfigSetting5A161110361705808128","label":"listConfigSettingsLabel161110361705903095","value":"[A] production value"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:03 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjQ=;sn=3852724',
  'x-ms-request-id',
  'f2a04889-0461-41c1-9520-d26c5ea1129a',
  'x-ms-correlation-request-id',
  'f2a04889-0461-41c1-9520-d26c5ea1129a',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"key":"listConfigSetting5A161110361705808128","label":null,"value":"[A] value"},{"key":"listConfigSetting5A161110361705808128","label":"listConfigSettingsLabel161110361705903095","value":"[A] production value"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MjQ=;sn=3852724',
  'x-ms-request-id',
  '0b5aa786-d828-433a-8e88-881475e00bce',
  'x-ms-correlation-request-id',
  '0b5aa786-d828-433a-8e88-881475e00bce',
  'x-ms-tenant-name',
  'riparkdev',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
