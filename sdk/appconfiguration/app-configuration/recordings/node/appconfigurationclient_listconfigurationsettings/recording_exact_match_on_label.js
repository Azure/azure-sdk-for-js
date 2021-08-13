let nock = require('nock');

module.exports.hash = "bfdf8e4c167825d5ff3bb1d134e00d6b";

module.exports.testInfo = {"uniqueName":{"listConfigSetting1A":"listConfigSetting1A161110360662308787","listConfigSetting1B":"listConfigSetting1B161110360662305001","listConfigSettingsLabel":"listConfigSettingsLabel161110360662307105"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting1A161110360662308787', {"key":"listConfigSetting1A161110360662308787","label":"listConfigSettingsLabel161110360662307105","content_type":"a content type","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"Rm1gsCCmP3P7TSppSUo9AVxzjRH","key":"listConfigSetting1A161110360662308787","label":"listConfigSettingsLabel161110360662307105","content_type":"a content type","value":"[A] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:57 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:47 GMT',
  'ETag',
  '"Rm1gsCCmP3P7TSppSUo9AVxzjRH"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTM=;sn=3852693',
  'x-ms-request-id',
  '29fc4731-918e-4687-964b-1a2cbcff6e88',
  'x-ms-correlation-request-id',
  '29fc4731-918e-4687-964b-1a2cbcff6e88',
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
  .put('/locks/listConfigSetting1A161110360662308787')
  .query(true)
  .reply(200, {"etag":"im3ZQjQVkC29ubWi7DvyMZ3Hcun","key":"listConfigSetting1A161110360662308787","label":"listConfigSettingsLabel161110360662307105","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:47 GMT',
  'ETag',
  '"im3ZQjQVkC29ubWi7DvyMZ3Hcun"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTQ=;sn=3852694',
  'x-ms-request-id',
  '03e71667-fdd4-4b20-a03e-da56cb20260e',
  'x-ms-correlation-request-id',
  '03e71667-fdd4-4b20-a03e-da56cb20260e',
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
  .put('/kv/listConfigSetting1A161110360662308787', {"key":"listConfigSetting1A161110360662308787","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"a0WJ5PUARa5vxTruUWrnaOVAHF3","key":"listConfigSetting1A161110360662308787","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:58 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:48 GMT',
  'ETag',
  '"a0WJ5PUARa5vxTruUWrnaOVAHF3"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTU=;sn=3852695',
  'x-ms-request-id',
  '971e0d35-48e5-469d-8204-5daf8a8c8666',
  'x-ms-correlation-request-id',
  '971e0d35-48e5-469d-8204-5daf8a8c8666',
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
  .put('/kv/listConfigSetting1B161110360662305001', {"key":"listConfigSetting1B161110360662305001","label":"listConfigSettingsLabel161110360662307105","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"STsww1iRM8UjQPrIRVyrs1eDttN","key":"listConfigSetting1B161110360662305001","label":"listConfigSettingsLabel161110360662307105","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:48 GMT',
  'ETag',
  '"STsww1iRM8UjQPrIRVyrs1eDttN"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTY=;sn=3852696',
  'x-ms-request-id',
  'c3ce56e2-7554-43e7-8a9b-b6c64efde971',
  'x-ms-correlation-request-id',
  'c3ce56e2-7554-43e7-8a9b-b6c64efde971',
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
  .put('/kv/listConfigSetting1B161110360662305001', {"key":"listConfigSetting1B161110360662305001","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"zzzevCc5PrHId0JifzvOJv0q33P","key":"listConfigSetting1B161110360662305001","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:59 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 20 Jan 2021 00:46:48 GMT',
  'ETag',
  '"zzzevCc5PrHId0JifzvOJv0q33P"',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTk=;sn=3852699',
  'x-ms-request-id',
  '494784b5-e32d-48b4-95d8-778680f62df9',
  'x-ms-correlation-request-id',
  '494784b5-e32d-48b4-95d8-778680f62df9',
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
  .reply(200, {"items":[{"etag":"im3ZQjQVkC29ubWi7DvyMZ3Hcun","key":"listConfigSetting1A161110360662308787","label":"listConfigSettingsLabel161110360662307105","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:47+00:00"},{"etag":"STsww1iRM8UjQPrIRVyrs1eDttN","key":"listConfigSetting1B161110360662305001","label":"listConfigSettingsLabel161110360662307105","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:48+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:46:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTk=;sn=3852699',
  'x-ms-request-id',
  '23a0bbf3-0776-47a4-ab36-83aab2aff69f',
  'x-ms-correlation-request-id',
  '23a0bbf3-0776-47a4-ab36-83aab2aff69f',
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
  .reply(200, {"items":[{"etag":"im3ZQjQVkC29ubWi7DvyMZ3Hcun","key":"listConfigSetting1A161110360662308787","label":"listConfigSettingsLabel161110360662307105","content_type":"a content type","value":"[A] production value","tags":{},"locked":true,"last_modified":"2021-01-20T00:46:47+00:00"},{"etag":"STsww1iRM8UjQPrIRVyrs1eDttN","key":"listConfigSetting1B161110360662305001","label":"listConfigSettingsLabel161110360662307105","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2021-01-20T00:46:48+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 20 Jan 2021 00:45:59 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NDo1IzM4NTI2OTk=;sn=3852699',
  'x-ms-request-id',
  '78687a5d-305f-4ed9-946b-ae8209e9d473',
  'x-ms-correlation-request-id',
  '78687a5d-305f-4ed9-946b-ae8209e9d473',
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
