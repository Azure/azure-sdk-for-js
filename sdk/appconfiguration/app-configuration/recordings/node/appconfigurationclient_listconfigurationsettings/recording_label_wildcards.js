let nock = require('nock');

module.exports.hash = "e334772c13e43605d4ac96fd87016df4";

module.exports.testInfo = {"uniqueName":{"listConfigSetting2A":"listConfigSetting2A158696681289701973","listConfigSetting2B":"listConfigSetting2B158696681289706736","listConfigSettingsLabel":"listConfigSettingsLabel158696681289700805"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting2A158696681289701973', {"key":"listConfigSetting2A158696681289701973","label":"listConfigSettingsLabel158696681289700805","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"7688IsLZBfT0bq38OCOWQ0Vsjuu","key":"listConfigSetting2A158696681289701973","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"7688IsLZBfT0bq38OCOWQ0Vsjuu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY0;sn=1902364',
  'x-ms-request-id',
  '6ec30e11-b6af-4f01-9f29-b8d1ff4fece9',
  'x-ms-correlation-request-id',
  '6ec30e11-b6af-4f01-9f29-b8d1ff4fece9',
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
  .put('/locks/listConfigSetting2A158696681289701973')
  .query(true)
  .reply(200, {"etag":"WGQRnDpZ8pz413Js4Tu0mbbaInK","key":"listConfigSetting2A158696681289701973","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"WGQRnDpZ8pz413Js4Tu0mbbaInK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY1;sn=1902365',
  'x-ms-request-id',
  '43cc3c3c-9de8-4e9d-a669-5d668be5f5d8',
  'x-ms-correlation-request-id',
  '43cc3c3c-9de8-4e9d-a669-5d668be5f5d8',
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
  .put('/kv/listConfigSetting2A158696681289701973', {"key":"listConfigSetting2A158696681289701973","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"Oczzrl4lY8jOJE6Y74HCIxAgdaS","key":"listConfigSetting2A158696681289701973","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"Oczzrl4lY8jOJE6Y74HCIxAgdaS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY2;sn=1902366',
  'x-ms-request-id',
  'cbe4d5d8-1ff1-42f6-b930-a1e62644013d',
  'x-ms-correlation-request-id',
  'cbe4d5d8-1ff1-42f6-b930-a1e62644013d',
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
  .put('/kv/listConfigSetting2B158696681289706736', {"key":"listConfigSetting2B158696681289706736","label":"listConfigSettingsLabel158696681289700805","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"5KLYmTrxxteMbzmg3vnFk2vn9T7","key":"listConfigSetting2B158696681289706736","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"5KLYmTrxxteMbzmg3vnFk2vn9T7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY3;sn=1902367',
  'x-ms-request-id',
  'bb25d076-cfe2-42b2-9a8c-59b9ddf8f931',
  'x-ms-correlation-request-id',
  'bb25d076-cfe2-42b2-9a8c-59b9ddf8f931',
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
  .put('/kv/listConfigSetting2B158696681289706736', {"key":"listConfigSetting2B158696681289706736","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"VKseDwfOitKLB4Ho65YekLZlFdm","key":"listConfigSetting2B158696681289706736","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'ETag',
  '"VKseDwfOitKLB4Ho65YekLZlFdm"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY4;sn=1902368',
  'x-ms-request-id',
  '56e7eb8e-dc7a-4208-9144-1555e204d642',
  'x-ms-correlation-request-id',
  '56e7eb8e-dc7a-4208-9144-1555e204d642',
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
  .reply(200, {"items":[{"etag":"WGQRnDpZ8pz413Js4Tu0mbbaInK","key":"listConfigSetting2A158696681289701973","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:53+00:00"},{"etag":"5KLYmTrxxteMbzmg3vnFk2vn9T7","key":"listConfigSetting2B158696681289706736","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY4;sn=1902368',
  'x-ms-request-id',
  'f66b2004-b3d3-41c2-b543-07354574d49a',
  'x-ms-correlation-request-id',
  'f66b2004-b3d3-41c2-b543-07354574d49a',
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
  .reply(200, {"items":[{"etag":"WGQRnDpZ8pz413Js4Tu0mbbaInK","key":"listConfigSetting2A158696681289701973","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:06:53+00:00"},{"etag":"5KLYmTrxxteMbzmg3vnFk2vn9T7","key":"listConfigSetting2B158696681289706736","label":"listConfigSettingsLabel158696681289700805","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzY4;sn=1902368',
  'x-ms-request-id',
  'b4bf2ca3-a749-4c41-be77-3ed4c02184fa',
  'x-ms-correlation-request-id',
  'b4bf2ca3-a749-4c41-be77-3ed4c02184fa',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
