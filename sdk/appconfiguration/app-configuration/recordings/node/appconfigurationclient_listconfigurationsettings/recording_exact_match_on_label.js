let nock = require('nock');

module.exports.hash = "0885dcfbe518db993e5aeb09e5589e49";

module.exports.testInfo = {"uniqueName":{"listConfigSetting1A":"listConfigSetting1A158696681210702735","listConfigSetting1B":"listConfigSetting1B158696681210703731","listConfigSettingsLabel":"listConfigSettingsLabel158696681210700332"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting1A158696681210702735', {"key":"listConfigSetting1A158696681210702735","label":"listConfigSettingsLabel158696681210700332","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"FHIDHBxG7AfuyYLeUYltv01IoGM","key":"listConfigSetting1A158696681210702735","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'ETag',
  '"FHIDHBxG7AfuyYLeUYltv01IoGM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzU5;sn=1902359',
  'x-ms-request-id',
  'a92f2414-d121-4039-95c8-957e387f09ed',
  'x-ms-correlation-request-id',
  'a92f2414-d121-4039-95c8-957e387f09ed',
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
  .put('/locks/listConfigSetting1A158696681210702735')
  .query(true)
  .reply(200, {"etag":"ahpCh621vtmWTuVSl847vpogRAZ","key":"listConfigSetting1A158696681210702735","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'ETag',
  '"ahpCh621vtmWTuVSl847vpogRAZ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYw;sn=1902360',
  'x-ms-request-id',
  'bd64786f-b532-402c-ac44-5cc462a9bd74',
  'x-ms-correlation-request-id',
  'bd64786f-b532-402c-ac44-5cc462a9bd74',
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
  .put('/kv/listConfigSetting1A158696681210702735', {"key":"listConfigSetting1A158696681210702735","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"duuynMgvdiP84tziRMV5CNiRXRT","key":"listConfigSetting1A158696681210702735","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'ETag',
  '"duuynMgvdiP84tziRMV5CNiRXRT"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYx;sn=1902361',
  'x-ms-request-id',
  'c2e71910-b501-43cb-baa2-bee69ffaa589',
  'x-ms-correlation-request-id',
  'c2e71910-b501-43cb-baa2-bee69ffaa589',
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
  .put('/kv/listConfigSetting1B158696681210703731', {"key":"listConfigSetting1B158696681210703731","label":"listConfigSettingsLabel158696681210700332","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"V8dCYKgn19OU7DbjYlGEAbdvbAH","key":"listConfigSetting1B158696681210703731","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"V8dCYKgn19OU7DbjYlGEAbdvbAH"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYy;sn=1902362',
  'x-ms-request-id',
  '54d4ad64-2218-4226-96c7-d8dea5aa38da',
  'x-ms-correlation-request-id',
  '54d4ad64-2218-4226-96c7-d8dea5aa38da',
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
  .put('/kv/listConfigSetting1B158696681210703731', {"key":"listConfigSetting1B158696681210703731","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"ZNu9ba3sqcJDjbdQQlpsiwOme5X","key":"listConfigSetting1B158696681210703731","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"ZNu9ba3sqcJDjbdQQlpsiwOme5X"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYz;sn=1902363',
  'x-ms-request-id',
  '3599848d-92d0-48de-b465-06cbecd1032f',
  'x-ms-correlation-request-id',
  '3599848d-92d0-48de-b465-06cbecd1032f',
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
  .reply(200, {"items":[{"etag":"ahpCh621vtmWTuVSl847vpogRAZ","key":"listConfigSetting1A158696681210702735","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:52+00:00"},{"etag":"V8dCYKgn19OU7DbjYlGEAbdvbAH","key":"listConfigSetting1B158696681210703731","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYz;sn=1902363',
  'x-ms-request-id',
  '2d9b300b-2bd7-4701-b349-07a13faeb3bd',
  'x-ms-correlation-request-id',
  '2d9b300b-2bd7-4701-b349-07a13faeb3bd',
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
  .reply(200, {"items":[{"etag":"ahpCh621vtmWTuVSl847vpogRAZ","key":"listConfigSetting1A158696681210702735","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:52+00:00"},{"etag":"V8dCYKgn19OU7DbjYlGEAbdvbAH","key":"listConfigSetting1B158696681210703731","label":"listConfigSettingsLabel158696681210700332","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzYz;sn=1902363',
  'x-ms-request-id',
  '68265f25-29c6-4209-a533-a9f9a665bb32',
  'x-ms-correlation-request-id',
  '68265f25-29c6-4209-a533-a9f9a665bb32',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
