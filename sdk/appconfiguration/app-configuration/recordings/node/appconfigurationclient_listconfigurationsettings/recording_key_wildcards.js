let nock = require('nock');

module.exports.hash = "ba5a3177869147351216dcd908622e60";

module.exports.testInfo = {"uniqueName":{"listConfigSetting4A":"listConfigSetting4A161110361443106960","listConfigSetting4B":"listConfigSetting4B161110361443104431","listConfigSettingsLabel":"listConfigSettingsLabel161110361443105691"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting4A161110361443106960', {"key":"listConfigSetting4A161110361443106960","label":"listConfigSettingsLabel161110361443105691","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"xnQNTzJYYN421NlTuGaShpjFUTJ","key":"listConfigSetting4A161110361443106960","label":"listConfigSettingsLabel161110361443105691","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:05 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:55 GMT',
  'ETag',
  '"xnQNTzJYYN421NlTuGaShpjFUTJ"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTI=;sn=3852712',
  'x-ms-request-id',
  'df43b982-699d-4a00-b54e-2503c7f77fa8',
  'x-ms-correlation-request-id',
  'df43b982-699d-4a00-b54e-2503c7f77fa8',
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
  .put('/locks/listConfigSetting4A161110361443106960')
  .query(true)
  .reply(200, {"etag":"sSaTwFYEDnBeGrkuL6vuuBumPTt","key":"listConfigSetting4A161110361443106960","label":"listConfigSettingsLabel161110361443105691","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:58 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:55 GMT',
  'ETag',
  '"sSaTwFYEDnBeGrkuL6vuuBumPTt"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTQ=;sn=3852714',
  'x-ms-request-id',
  '98729e9c-4a99-4fbe-9ebe-c5c4a538b08a',
  'x-ms-correlation-request-id',
  '98729e9c-4a99-4fbe-9ebe-c5c4a538b08a',
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
  .put('/kv/listConfigSetting4A161110361443106960', {"key":"listConfigSetting4A161110361443106960","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"J31PjMJgrp1vm7Lx4VfG8QLq3xh","key":"listConfigSetting4A161110361443106960","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:55 GMT',
  'ETag',
  '"J31PjMJgrp1vm7Lx4VfG8QLq3xh"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTU=;sn=3852715',
  'x-ms-request-id',
  'a6773779-02fe-4ab2-9b84-00c10f7dd8e1',
  'x-ms-correlation-request-id',
  'a6773779-02fe-4ab2-9b84-00c10f7dd8e1',
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
  .put('/kv/listConfigSetting4B161110361443104431', {"key":"listConfigSetting4B161110361443104431","label":"listConfigSettingsLabel161110361443105691","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"D0OqJUSpqCHZcTGp2OZPteB1jbz","key":"listConfigSetting4B161110361443104431","label":"listConfigSettingsLabel161110361443105691","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:56+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:59 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:56 GMT',
  'ETag',
  '"D0OqJUSpqCHZcTGp2OZPteB1jbz"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTY=;sn=3852716',
  'x-ms-request-id',
  '56ed2644-d208-4846-895f-5b6f847fc735',
  'x-ms-correlation-request-id',
  '56ed2644-d208-4846-895f-5b6f847fc735',
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
  .put('/kv/listConfigSetting4B161110361443104431', {"key":"listConfigSetting4B161110361443104431","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"B934Ox4mSxtPuOYXE0ElaaupPb3","key":"listConfigSetting4B161110361443104431","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:56+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:56 GMT',
  'ETag',
  '"B934Ox4mSxtPuOYXE0ElaaupPb3"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTc=;sn=3852717',
  'x-ms-request-id',
  'e0513fac-939c-4b13-946b-fd15327b77ef',
  'x-ms-correlation-request-id',
  'e0513fac-939c-4b13-946b-fd15327b77ef',
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
  .reply(200, {"items":[{"etag":"J31PjMJgrp1vm7Lx4VfG8QLq3xh","key":"listConfigSetting4A161110361443106960","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:55+00:00"},{"etag":"sSaTwFYEDnBeGrkuL6vuuBumPTt","key":"listConfigSetting4A161110361443106960","label":"listConfigSettingsLabel161110361443105691","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:55+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:59 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTc=;sn=3852717',
  'x-ms-request-id',
  '20dcaff2-f822-48a8-9106-d5fe21f3b570',
  'x-ms-correlation-request-id',
  '20dcaff2-f822-48a8-9106-d5fe21f3b570',
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
  .reply(200, {"items":[{"etag":"J31PjMJgrp1vm7Lx4VfG8QLq3xh","key":"listConfigSetting4A161110361443106960","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:55+00:00"},{"etag":"sSaTwFYEDnBeGrkuL6vuuBumPTt","key":"listConfigSetting4A161110361443106960","label":"listConfigSettingsLabel161110361443105691","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:55+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:07 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI3MTc=;sn=3852717',
  'x-ms-request-id',
  'c51061f4-ea29-4a3b-8b4a-afb883450ffc',
  'x-ms-correlation-request-id',
  'c51061f4-ea29-4a3b-8b4a-afb883450ffc',
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
