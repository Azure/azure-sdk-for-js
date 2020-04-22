let nock = require('nock');

module.exports.hash = "75c4829688d23535cda10aff9d09dc5e";

module.exports.testInfo = {"uniqueName":{"listConfigSetting4A":"listConfigSetting4A158696681448109037","listConfigSetting4B":"listConfigSetting4B158696681448107423","listConfigSettingsLabel":"listConfigSettingsLabel158696681448107380"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting4A158696681448109037', {"key":"listConfigSetting4A158696681448109037","label":"listConfigSettingsLabel158696681448107380","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"kEu3jzTQyVfJfCbUSUds9MU92YE","key":"listConfigSetting4A158696681448109037","label":"listConfigSettingsLabel158696681448107380","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"kEu3jzTQyVfJfCbUSUds9MU92YE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc0;sn=1902374',
  'x-ms-request-id',
  'd059a083-2fb9-4d42-9d92-96c402830a16',
  'x-ms-correlation-request-id',
  'd059a083-2fb9-4d42-9d92-96c402830a16',
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
  .put('/locks/listConfigSetting4A158696681448109037')
  .query(true)
  .reply(200, {"etag":"st6EnSEiPBXDWgruLyFKihd3JFu","key":"listConfigSetting4A158696681448109037","label":"listConfigSettingsLabel158696681448107380","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:55+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"st6EnSEiPBXDWgruLyFKihd3JFu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc1;sn=1902375',
  'x-ms-request-id',
  'f04e91a5-4d20-485f-ac7f-648899c78e45',
  'x-ms-correlation-request-id',
  'f04e91a5-4d20-485f-ac7f-648899c78e45',
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
  .put('/kv/listConfigSetting4A158696681448109037', {"key":"listConfigSetting4A158696681448109037","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"yucCayKAPGxownyUNpsRstB3DhK","key":"listConfigSetting4A158696681448109037","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"yucCayKAPGxownyUNpsRstB3DhK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc2;sn=1902376',
  'x-ms-request-id',
  '3434660f-5d2e-4e56-9d7e-09844359d825',
  'x-ms-correlation-request-id',
  '3434660f-5d2e-4e56-9d7e-09844359d825',
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
  .put('/kv/listConfigSetting4B158696681448107423', {"key":"listConfigSetting4B158696681448107423","label":"listConfigSettingsLabel158696681448107380","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"0DSfmNgQBAgmFIeqJGlZAYSMHvQ","key":"listConfigSetting4B158696681448107423","label":"listConfigSettingsLabel158696681448107380","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:55 GMT',
  'ETag',
  '"0DSfmNgQBAgmFIeqJGlZAYSMHvQ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc3;sn=1902377',
  'x-ms-request-id',
  '6e8314e9-0c84-4225-a9b9-b17cd15117aa',
  'x-ms-correlation-request-id',
  '6e8314e9-0c84-4225-a9b9-b17cd15117aa',
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
  .put('/kv/listConfigSetting4B158696681448107423', {"key":"listConfigSetting4B158696681448107423","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"FvK5663mSVXMrZhyN2wAn6DelZE","key":"listConfigSetting4B158696681448107423","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"}, [
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
  '"FvK5663mSVXMrZhyN2wAn6DelZE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzc4;sn=1902378',
  'x-ms-request-id',
  '6783f69a-60e1-4efd-b1b0-255054356fdb',
  'x-ms-correlation-request-id',
  '6783f69a-60e1-4efd-b1b0-255054356fdb',
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
  .reply(200, {"items":[{"etag":"yucCayKAPGxownyUNpsRstB3DhK","key":"listConfigSetting4A158696681448109037","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"},{"etag":"st6EnSEiPBXDWgruLyFKihd3JFu","key":"listConfigSetting4A158696681448109037","label":"listConfigSettingsLabel158696681448107380","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:55+00:00"}]}, [
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
  'zAJw6V16=NjotMSMxOTAyMzc4;sn=1902378',
  'x-ms-request-id',
  'b368551d-afb2-4573-9bd1-186933f6fae2',
  'x-ms-correlation-request-id',
  'b368551d-afb2-4573-9bd1-186933f6fae2',
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
  .reply(200, {"items":[{"etag":"yucCayKAPGxownyUNpsRstB3DhK","key":"listConfigSetting4A158696681448109037","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:55+00:00"},{"etag":"st6EnSEiPBXDWgruLyFKihd3JFu","key":"listConfigSetting4A158696681448109037","label":"listConfigSettingsLabel158696681448107380","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:55+00:00"}]}, [
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
  'zAJw6V16=NjotMSMxOTAyMzc4;sn=1902378',
  'x-ms-request-id',
  '7d5673a5-d0fa-4915-a8d0-81a858c20554',
  'x-ms-correlation-request-id',
  '7d5673a5-d0fa-4915-a8d0-81a858c20554',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
