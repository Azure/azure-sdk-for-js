let nock = require('nock');

module.exports.hash = "cb2f3bda6a2d39d48cc3b10a159bf14a";

module.exports.testInfo = {"uniqueName":{"listConfigSetting8A":"listConfigSetting8A161110371274501598","listConfigSetting8B":"listConfigSetting8B161110371274508287","listConfigSettingsLabel":"listConfigSettingsLabel161110371274501737"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting8A161110371274501598', {"key":"listConfigSetting8A161110371274501598","label":"listConfigSettingsLabel161110371274501737","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"ACjg8Em0r7f05GrPbRLWWv4fVhv","key":"listConfigSetting8A161110371274501598","label":"listConfigSettingsLabel161110371274501737","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:48:33+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:48:33 GMT',
  'ETag',
  '"ACjg8Em0r7f05GrPbRLWWv4fVhv"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTMxNTg=;sn=3853158',
  'x-ms-request-id',
  'cae62604-e8ea-402f-a946-dd80fb1d30da',
  'x-ms-correlation-request-id',
  'cae62604-e8ea-402f-a946-dd80fb1d30da',
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
  .put('/locks/listConfigSetting8A161110371274501598')
  .query(true)
  .reply(200, {"etag":"Sq1yD1QjijuDtzoVrydMmMKRQNF","key":"listConfigSetting8A161110371274501598","label":"listConfigSettingsLabel161110371274501737","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:48:33+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:48:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:48:33 GMT',
  'ETag',
  '"Sq1yD1QjijuDtzoVrydMmMKRQNF"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTMxNTk=;sn=3853159',
  'x-ms-request-id',
  '01a621de-a71c-4374-9dbe-edbde39441fd',
  'x-ms-correlation-request-id',
  '01a621de-a71c-4374-9dbe-edbde39441fd',
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
  .put('/kv/listConfigSetting8A161110371274501598', {"key":"listConfigSetting8A161110371274501598","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"eFdKh2xkbzxtLjTNAbf6jR9oSNy","key":"listConfigSetting8A161110371274501598","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:48:34+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:48:34 GMT',
  'ETag',
  '"eFdKh2xkbzxtLjTNAbf6jR9oSNy"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTMxNjA=;sn=3853160',
  'x-ms-request-id',
  '8160fd90-b005-4aab-84bd-ffff3ce6164c',
  'x-ms-correlation-request-id',
  '8160fd90-b005-4aab-84bd-ffff3ce6164c',
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
  .put('/kv/listConfigSetting8B161110371274508287', {"key":"listConfigSetting8B161110371274508287","label":"listConfigSettingsLabel161110371274501737","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"N08eGFO7Sjc2Gwd4qhK8G5WtRzt","key":"listConfigSetting8B161110371274508287","label":"listConfigSettingsLabel161110371274501737","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:48:34+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:48:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:48:34 GMT',
  'ETag',
  '"N08eGFO7Sjc2Gwd4qhK8G5WtRzt"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTMxNjE=;sn=3853161',
  'x-ms-request-id',
  '78d70337-bb61-45b3-900d-64d6b4e823bb',
  'x-ms-correlation-request-id',
  '78d70337-bb61-45b3-900d-64d6b4e823bb',
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
  .put('/kv/listConfigSetting8B161110371274508287', {"key":"listConfigSetting8B161110371274508287","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"HRaHrJiswpZ2fTdmaLChvlBhTdC","key":"listConfigSetting8B161110371274508287","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:48:35+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:47:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:48:35 GMT',
  'ETag',
  '"HRaHrJiswpZ2fTdmaLChvlBhTdC"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTMxNjI=;sn=3853162',
  'x-ms-request-id',
  'd85d9afe-f30c-4691-a617-6ab95f2cd130',
  'x-ms-correlation-request-id',
  'd85d9afe-f30c-4691-a617-6ab95f2cd130',
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
