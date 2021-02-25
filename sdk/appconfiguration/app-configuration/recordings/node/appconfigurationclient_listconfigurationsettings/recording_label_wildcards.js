let nock = require('nock');

module.exports.hash = "9f1a26e42b4ccda6d902230edda7a504";

module.exports.testInfo = {"uniqueName":{"listConfigSetting2A":"listConfigSetting2A161110360930802770","listConfigSetting2B":"listConfigSetting2B161110360930800398","listConfigSettingsLabel":"listConfigSettingsLabel161110360930807497"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting2A161110360930802770', {"key":"listConfigSetting2A161110360930802770","label":"listConfigSettingsLabel161110360930807497","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"EpyLPRS7AZAXXXwskRHgAYYUiBj","key":"listConfigSetting2A161110360930802770","label":"listConfigSettingsLabel161110360930807497","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:50+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:50 GMT',
  'ETag',
  '"EpyLPRS7AZAXXXwskRHgAYYUiBj"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDA=;sn=3852700',
  'x-ms-request-id',
  '1169ee45-dc63-4ff3-9e63-e741a24c08c9',
  'x-ms-correlation-request-id',
  '1169ee45-dc63-4ff3-9e63-e741a24c08c9',
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
  .put('/locks/listConfigSetting2A161110360930802770')
  .query(true)
  .reply(200, {"etag":"PTJaLoG22bzRRl6zUHwnCwrU0lF","key":"listConfigSetting2A161110360930802770","label":"listConfigSettingsLabel161110360930807497","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:50+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:00 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:50 GMT',
  'ETag',
  '"PTJaLoG22bzRRl6zUHwnCwrU0lF"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDE=;sn=3852701',
  'x-ms-request-id',
  '4153d2fc-e961-4943-b91d-385367cc0828',
  'x-ms-correlation-request-id',
  '4153d2fc-e961-4943-b91d-385367cc0828',
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
  .put('/kv/listConfigSetting2A161110360930802770', {"key":"listConfigSetting2A161110360930802770","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"gXdXdEdgQFIEuvrM6eG54lfWPpB","key":"listConfigSetting2A161110360930802770","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:50+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:50 GMT',
  'ETag',
  '"gXdXdEdgQFIEuvrM6eG54lfWPpB"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDI=;sn=3852702',
  'x-ms-request-id',
  '3cb0c73a-419f-49e1-927e-c0ab68ae7574',
  'x-ms-correlation-request-id',
  '3cb0c73a-419f-49e1-927e-c0ab68ae7574',
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
  .put('/kv/listConfigSetting2B161110360930800398', {"key":"listConfigSetting2B161110360930800398","label":"listConfigSettingsLabel161110360930807497","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"OXPYVSgDZW1p5B6AulDSHc4IEL3","key":"listConfigSetting2B161110360930800398","label":"listConfigSettingsLabel161110360930807497","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:51+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:51 GMT',
  'ETag',
  '"OXPYVSgDZW1p5B6AulDSHc4IEL3"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDQ=;sn=3852704',
  'x-ms-request-id',
  '14cd29b3-be3b-413b-bf46-37bf0b14bbd0',
  'x-ms-correlation-request-id',
  '14cd29b3-be3b-413b-bf46-37bf0b14bbd0',
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
  .put('/kv/listConfigSetting2B161110360930800398', {"key":"listConfigSetting2B161110360930800398","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"rqsiOLHqE5KqY9SiKJONwoahuc5","key":"listConfigSetting2B161110360930800398","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:51+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:51 GMT',
  'ETag',
  '"rqsiOLHqE5KqY9SiKJONwoahuc5"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDU=;sn=3852705',
  'x-ms-request-id',
  'c6b5c860-d0d4-4572-a5a1-2c385d799d82',
  'x-ms-correlation-request-id',
  'c6b5c860-d0d4-4572-a5a1-2c385d799d82',
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
  .reply(200, {"items":[{"etag":"PTJaLoG22bzRRl6zUHwnCwrU0lF","key":"listConfigSetting2A161110360930802770","label":"listConfigSettingsLabel161110360930807497","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:50+00:00"},{"etag":"OXPYVSgDZW1p5B6AulDSHc4IEL3","key":"listConfigSetting2B161110360930800398","label":"listConfigSettingsLabel161110360930807497","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:51+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDU=;sn=3852705',
  'x-ms-request-id',
  '5cc6fe63-ade0-4a72-89d6-5b0aa0bacc5f',
  'x-ms-correlation-request-id',
  '5cc6fe63-ade0-4a72-89d6-5b0aa0bacc5f',
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
  .reply(200, {"items":[{"etag":"PTJaLoG22bzRRl6zUHwnCwrU0lF","key":"listConfigSetting2A161110360930802770","label":"listConfigSettingsLabel161110360930807497","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:50+00:00"},{"etag":"OXPYVSgDZW1p5B6AulDSHc4IEL3","key":"listConfigSetting2B161110360930800398","label":"listConfigSettingsLabel161110360930807497","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:51+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:02 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDU=;sn=3852705',
  'x-ms-request-id',
  'afa1ca44-3095-494b-bf4b-df06f0018427',
  'x-ms-correlation-request-id',
  'afa1ca44-3095-494b-bf4b-df06f0018427',
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
