let nock = require('nock');

module.exports.hash = "87b2cfd4f578677455e28b48177e5984";

module.exports.testInfo = {"uniqueName":{"listConfigSetting5A":"listConfigSetting5A158690903348608322","listConfigSetting5B":"listConfigSetting5B158690903348602445","listConfigSettingsLabel":"listConfigSettingsLabel158690903348600284"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting5A158690903348608322', {"key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"Po9StN7WjvkkeJSHC84HBxh6g3L","key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'ETag',
  '"Po9StN7WjvkkeJSHC84HBxh6g3L"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY3;sn=1897467',
  'x-ms-request-id',
  'f9068eed-dae2-4586-a7ce-362821e88918',
  'x-ms-correlation-request-id',
  'f9068eed-dae2-4586-a7ce-362821e88918',
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
  .put('/locks/listConfigSetting5A158690903348608322')
  .query(true)
  .reply(200, {"etag":"NOMlfzfpGcdgsWMfKgwg14G3zoZ","key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'ETag',
  '"NOMlfzfpGcdgsWMfKgwg14G3zoZ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY4;sn=1897468',
  'x-ms-request-id',
  '54ead197-99a8-4c69-a1b9-64ddefa4445f',
  'x-ms-correlation-request-id',
  '54ead197-99a8-4c69-a1b9-64ddefa4445f',
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
  .put('/kv/listConfigSetting5A158690903348608322', {"key":"listConfigSetting5A158690903348608322","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"pMI9bLY2U9hnWwCAVCBPZqfTsho","key":"listConfigSetting5A158690903348608322","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'ETag',
  '"pMI9bLY2U9hnWwCAVCBPZqfTsho"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY5;sn=1897469',
  'x-ms-request-id',
  '9c52f881-70aa-4312-a22d-e94729ac34a8',
  'x-ms-correlation-request-id',
  '9c52f881-70aa-4312-a22d-e94729ac34a8',
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
  .put('/kv/listConfigSetting5B158690903348602445', {"key":"listConfigSetting5B158690903348602445","label":"listConfigSettingsLabel158690903348600284","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"gR0L6ySqFrlSeKWUNGX5YEqad5S","key":"listConfigSetting5B158690903348602445","label":"listConfigSettingsLabel158690903348600284","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'ETag',
  '"gR0L6ySqFrlSeKWUNGX5YEqad5S"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcw;sn=1897470',
  'x-ms-request-id',
  '338f80e2-a9a1-49b8-b309-402350365999',
  'x-ms-correlation-request-id',
  '338f80e2-a9a1-49b8-b309-402350365999',
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
  .put('/kv/listConfigSetting5B158690903348602445', {"key":"listConfigSetting5B158690903348602445","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"2ZNEaUq7il8pJDeB8Y3jXXn4mCG","key":"listConfigSetting5B158690903348602445","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:54+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'ETag',
  '"2ZNEaUq7il8pJDeB8Y3jXXn4mCG"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcx;sn=1897471',
  'x-ms-request-id',
  'fad7c8e6-01bd-470c-a453-a5a449d88f65',
  'x-ms-correlation-request-id',
  'fad7c8e6-01bd-470c-a453-a5a449d88f65',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158690903348608322","label":null,"locked":false},{"key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","locked":true}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcx;sn=1897471',
  'x-ms-request-id',
  'f9cec21b-589f-4949-9bcd-c487d46e699f',
  'x-ms-correlation-request-id',
  'f9cec21b-589f-4949-9bcd-c487d46e699f',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158690903348608322","label":null,"locked":false},{"key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","locked":true}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcx;sn=1897471',
  'x-ms-request-id',
  '202ff033-89b5-4d3a-94b1-a848bbebb61b',
  'x-ms-correlation-request-id',
  '202ff033-89b5-4d3a-94b1-a848bbebb61b',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158690903348608322","label":null,"value":"[A] value"},{"key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","value":"[A] production value"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcx;sn=1897471',
  'x-ms-request-id',
  'e8e9bc0c-db2d-4ee6-a8ec-18488db2d7e4',
  'x-ms-correlation-request-id',
  'e8e9bc0c-db2d-4ee6-a8ec-18488db2d7e4',
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
  .reply(200, {"items":[{"key":"listConfigSetting5A158690903348608322","label":null,"value":"[A] value"},{"key":"listConfigSetting5A158690903348608322","label":"listConfigSettingsLabel158690903348600284","value":"[A] production value"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcx;sn=1897471',
  'x-ms-request-id',
  '4ae16bbc-e27f-458d-83ba-cba3eeba2d23',
  'x-ms-correlation-request-id',
  '4ae16bbc-e27f-458d-83ba-cba3eeba2d23',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
