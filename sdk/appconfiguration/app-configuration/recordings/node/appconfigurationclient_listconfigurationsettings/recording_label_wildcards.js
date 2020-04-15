let nock = require('nock');

module.exports.hash = "9cc5188aba4836843cd1c0108efec06d";

module.exports.testInfo = {"uniqueName":{"listConfigSetting2A":"listConfigSetting2A158690903115808860","listConfigSetting2B":"listConfigSetting2B158690903115805480","listConfigSettingsLabel":"listConfigSettingsLabel158690903115806594"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting2A158690903115808860', {"key":"listConfigSetting2A158690903115808860","label":"listConfigSettingsLabel158690903115806594","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"JYuGRJ6gofOn4e3qe2ZmNbTvw95","key":"listConfigSetting2A158690903115808860","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"JYuGRJ6gofOn4e3qe2ZmNbTvw95"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDUy;sn=1897452',
  'x-ms-request-id',
  '48ef3057-7c3c-4ab5-870b-e200c70b4655',
  'x-ms-correlation-request-id',
  '48ef3057-7c3c-4ab5-870b-e200c70b4655',
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
  .put('/locks/listConfigSetting2A158690903115808860')
  .query(true)
  .reply(200, {"etag":"CdGHaKr5jQ6E9cCYT1W08HgS5S6","key":"listConfigSetting2A158690903115808860","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"CdGHaKr5jQ6E9cCYT1W08HgS5S6"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDUz;sn=1897453',
  'x-ms-request-id',
  '8395c39d-b693-42b4-94fd-4b2a37b10f36',
  'x-ms-correlation-request-id',
  '8395c39d-b693-42b4-94fd-4b2a37b10f36',
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
  .put('/kv/listConfigSetting2A158690903115808860', {"key":"listConfigSetting2A158690903115808860","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"mtqDyhQUVsE2fi1gTzgq89cx8bD","key":"listConfigSetting2A158690903115808860","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"mtqDyhQUVsE2fi1gTzgq89cx8bD"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU0;sn=1897454',
  'x-ms-request-id',
  'c12565df-de57-45ec-8187-8060f9c3cf2c',
  'x-ms-correlation-request-id',
  'c12565df-de57-45ec-8187-8060f9c3cf2c',
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
  .put('/kv/listConfigSetting2B158690903115805480', {"key":"listConfigSetting2B158690903115805480","label":"listConfigSettingsLabel158690903115806594","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"10Lmwt9Vuj49oVccZ40ddAUFqPT","key":"listConfigSetting2B158690903115805480","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"10Lmwt9Vuj49oVccZ40ddAUFqPT"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU1;sn=1897455',
  'x-ms-request-id',
  '3597feee-b1ce-409f-bc30-ec215d1db510',
  'x-ms-correlation-request-id',
  '3597feee-b1ce-409f-bc30-ec215d1db510',
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
  .put('/kv/listConfigSetting2B158690903115805480', {"key":"listConfigSetting2B158690903115805480","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"5vxLfZDG4j9Rmdy7SToV2LfIHq3","key":"listConfigSetting2B158690903115805480","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"5vxLfZDG4j9Rmdy7SToV2LfIHq3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU2;sn=1897456',
  'x-ms-request-id',
  'dabd4b5d-300e-42da-baa2-d9ec6f07b62b',
  'x-ms-correlation-request-id',
  'dabd4b5d-300e-42da-baa2-d9ec6f07b62b',
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
  .reply(200, {"items":[{"etag":"CdGHaKr5jQ6E9cCYT1W08HgS5S6","key":"listConfigSetting2A158690903115808860","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"},{"etag":"10Lmwt9Vuj49oVccZ40ddAUFqPT","key":"listConfigSetting2B158690903115805480","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU2;sn=1897456',
  'x-ms-request-id',
  '312bd9ee-f041-4c58-b2c1-3fcbe6b04584',
  'x-ms-correlation-request-id',
  '312bd9ee-f041-4c58-b2c1-3fcbe6b04584',
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
  .reply(200, {"items":[{"etag":"CdGHaKr5jQ6E9cCYT1W08HgS5S6","key":"listConfigSetting2A158690903115808860","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"},{"etag":"10Lmwt9Vuj49oVccZ40ddAUFqPT","key":"listConfigSetting2B158690903115805480","label":"listConfigSettingsLabel158690903115806594","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU2;sn=1897456',
  'x-ms-request-id',
  'cb60f9ef-8952-4235-b1c5-62d587c4b2ce',
  'x-ms-correlation-request-id',
  'cb60f9ef-8952-4235-b1c5-62d587c4b2ce',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
