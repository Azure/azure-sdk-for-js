let nock = require('nock');

module.exports.hash = "af6d78f8f722024b3b688ca0f265e413";

module.exports.testInfo = {"uniqueName":{"listConfigSetting5A":"listConfigSetting5A158696681526702305","listConfigSetting5B":"listConfigSetting5B158696681526703113","listConfigSettingsLabel":"listConfigSettingsLabel158696681526703939"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5A158696681526702305', {"key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"9k78Hf6HBDIT3biq6ImOnlciB6q","key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"9k78Hf6HBDIT3biq6ImOnlciB6q"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc5;sn=1902379',
  'x-ms-request-id',
  '25fb04c2-007e-4675-8faa-a10e1fa89c7c',
  'x-ms-correlation-request-id',
  '25fb04c2-007e-4675-8faa-a10e1fa89c7c',
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
  .put('/locks/listConfigSetting5A158696681526702305')
  .query(true)
  .reply(200, {"etag":"hVHN7xkJ5qhP16VBW2xYGP4UUjz","key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:55+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"hVHN7xkJ5qhP16VBW2xYGP4UUjz"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgw;sn=1902380',
  'x-ms-request-id',
  '9cf3c3b1-2580-491c-8a95-be48764a59e7',
  'x-ms-correlation-request-id',
  '9cf3c3b1-2580-491c-8a95-be48764a59e7',
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
  .put('/kv/listConfigSetting5A158696681526702305', {"key":"listConfigSetting5A158696681526702305","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"uQAm0v1F6h3zlMLIankKSO5CJox","key":"listConfigSetting5A158696681526702305","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:56+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'ETag',
  '"uQAm0v1F6h3zlMLIankKSO5CJox"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgx;sn=1902381',
  'x-ms-request-id',
  'fec68ca3-515d-4575-87ea-4ae6170eaba4',
  'x-ms-correlation-request-id',
  'fec68ca3-515d-4575-87ea-4ae6170eaba4',
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
  .put('/kv/listConfigSetting5B158696681526703113', {"key":"listConfigSetting5B158696681526703113","label":"listConfigSettingsLabel158696681526703939","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"J1tX5w1sPHhPgVaNvUSGVJp2Ve8","key":"listConfigSetting5B158696681526703113","label":"listConfigSettingsLabel158696681526703939","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:56+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'ETag',
  '"J1tX5w1sPHhPgVaNvUSGVJp2Ve8"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgy;sn=1902382',
  'x-ms-request-id',
  '708e1999-da2e-4e22-afae-28881cbbcb78',
  'x-ms-correlation-request-id',
  '708e1999-da2e-4e22-afae-28881cbbcb78',
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
  .put('/kv/listConfigSetting5B158696681526703113', {"key":"listConfigSetting5B158696681526703113","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"31abCiGMJ4NjH1wp60fPZOwMZgW","key":"listConfigSetting5B158696681526703113","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:56+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'ETag',
  '"31abCiGMJ4NjH1wp60fPZOwMZgW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgz;sn=1902383',
  'x-ms-request-id',
  '6d026924-c438-4b8a-af5f-217a4b6c2f03',
  'x-ms-correlation-request-id',
  '6d026924-c438-4b8a-af5f-217a4b6c2f03',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158696681526702305","label":null,"locked":false},{"key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","locked":true}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgz;sn=1902383',
  'x-ms-request-id',
  'ee264379-f542-4e89-bd8a-fa258ec08159',
  'x-ms-correlation-request-id',
  'ee264379-f542-4e89-bd8a-fa258ec08159',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158696681526702305","label":null,"locked":false},{"key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","locked":true}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgz;sn=1902383',
  'x-ms-request-id',
  'b4517e69-aa7b-4504-9437-9bc564ca4efa',
  'x-ms-correlation-request-id',
  'b4517e69-aa7b-4504-9437-9bc564ca4efa',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158696681526702305","label":null,"value":"[A] value"},{"key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","value":"[A] production value"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgz;sn=1902383',
  'x-ms-request-id',
  '7cf8d94a-9182-4707-834a-f23f95552feb',
  'x-ms-correlation-request-id',
  '7cf8d94a-9182-4707-834a-f23f95552feb',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158696681526702305","label":null,"value":"[A] value"},{"key":"listConfigSetting5A158696681526702305","label":"listConfigSettingsLabel158696681526703939","value":"[A] production value"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:56 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzgz;sn=1902383',
  'x-ms-request-id',
  '684d8adb-7dad-4ed0-a4e0-cd2951668fcb',
  'x-ms-correlation-request-id',
  '684d8adb-7dad-4ed0-a4e0-cd2951668fcb',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
