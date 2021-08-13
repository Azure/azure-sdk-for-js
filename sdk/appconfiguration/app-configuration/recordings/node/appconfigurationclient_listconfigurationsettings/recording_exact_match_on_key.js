let nock = require('nock');

module.exports.hash = "28aae83a959d70fe29b625b9f47da1d1";

module.exports.testInfo = {"uniqueName":{"listConfigSetting3A":"listConfigSetting3A161110361179102311","listConfigSetting3B":"listConfigSetting3B161110361179105237","listConfigSettingsLabel":"listConfigSettingsLabel161110361179106398"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting3A161110361179102311', {"key":"listConfigSetting3A161110361179102311","label":"listConfigSettingsLabel161110361179106398","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"tpicQgkKsqWFoRiRXRaJIzu2ZsK","key":"listConfigSetting3A161110361179102311","label":"listConfigSettingsLabel161110361179106398","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:52+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:52 GMT',
  'ETag',
  '"tpicQgkKsqWFoRiRXRaJIzu2ZsK"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDY=;sn=3852706',
  'x-ms-request-id',
  '5f6112cf-01a6-4d62-b522-eb0a5a50dcd1',
  'x-ms-correlation-request-id',
  '5f6112cf-01a6-4d62-b522-eb0a5a50dcd1',
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
  .put('/locks/listConfigSetting3A161110361179102311')
  .query(true)
  .reply(200, {"etag":"Le2CM5tP6xxFJSDqDgNmID6GyGt","key":"listConfigSetting3A161110361179102311","label":"listConfigSettingsLabel161110361179106398","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:52+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:03 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:52 GMT',
  'ETag',
  '"Le2CM5tP6xxFJSDqDgNmID6GyGt"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDc=;sn=3852707',
  'x-ms-request-id',
  'dd9d1414-359c-4c8f-85dd-70267285e4c5',
  'x-ms-correlation-request-id',
  'dd9d1414-359c-4c8f-85dd-70267285e4c5',
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
  .put('/kv/listConfigSetting3A161110361179102311', {"key":"listConfigSetting3A161110361179102311","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"AiDXhO8xFfLLfrs1YJp5J5GjB82","key":"listConfigSetting3A161110361179102311","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:53+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:53 GMT',
  'ETag',
  '"AiDXhO8xFfLLfrs1YJp5J5GjB82"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MDk=;sn=3852709',
  'x-ms-request-id',
  '9a74a045-2f4c-4248-8a79-c791deb5f3c3',
  'x-ms-correlation-request-id',
  '9a74a045-2f4c-4248-8a79-c791deb5f3c3',
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
  .put('/kv/listConfigSetting3B161110361179105237', {"key":"listConfigSetting3B161110361179105237","label":"listConfigSettingsLabel161110361179106398","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"4S6CaEKs8R9ak2nvLQhXGYXV0rH","key":"listConfigSetting3B161110361179105237","label":"listConfigSettingsLabel161110361179106398","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:53+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:03 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:53 GMT',
  'ETag',
  '"4S6CaEKs8R9ak2nvLQhXGYXV0rH"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTA=;sn=3852710',
  'x-ms-request-id',
  '1a2b57e6-a018-44cd-af6c-59715e86f356',
  'x-ms-correlation-request-id',
  '1a2b57e6-a018-44cd-af6c-59715e86f356',
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
  .put('/kv/listConfigSetting3B161110361179105237', {"key":"listConfigSetting3B161110361179105237","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"3FXUNWFXgH9poZGarYL8jjX4hcf","key":"listConfigSetting3B161110361179105237","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:54+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:54 GMT',
  'ETag',
  '"3FXUNWFXgH9poZGarYL8jjX4hcf"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTE=;sn=3852711',
  'x-ms-request-id',
  '62a3ee17-d3e5-4f3b-9f23-c374ebcc9e5b',
  'x-ms-correlation-request-id',
  '62a3ee17-d3e5-4f3b-9f23-c374ebcc9e5b',
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
  .reply(200, {"items":[{"etag":"AiDXhO8xFfLLfrs1YJp5J5GjB82","key":"listConfigSetting3A161110361179102311","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:53+00:00"},{"etag":"Le2CM5tP6xxFJSDqDgNmID6GyGt","key":"listConfigSetting3A161110361179102311","label":"listConfigSettingsLabel161110361179106398","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:52+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:04 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTE=;sn=3852711',
  'x-ms-request-id',
  '3a0305cd-99d2-432b-9a86-12b6846994d1',
  'x-ms-correlation-request-id',
  '3a0305cd-99d2-432b-9a86-12b6846994d1',
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
  .reply(200, {"items":[{"etag":"AiDXhO8xFfLLfrs1YJp5J5GjB82","key":"listConfigSetting3A161110361179102311","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:53+00:00"},{"etag":"Le2CM5tP6xxFJSDqDgNmID6GyGt","key":"listConfigSetting3A161110361179102311","label":"listConfigSettingsLabel161110361179106398","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:52+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:57 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTE=;sn=3852711',
  'x-ms-request-id',
  'ef670cae-e637-4789-8b1e-2bdafa59f9c8',
  'x-ms-correlation-request-id',
  'ef670cae-e637-4789-8b1e-2bdafa59f9c8',
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
