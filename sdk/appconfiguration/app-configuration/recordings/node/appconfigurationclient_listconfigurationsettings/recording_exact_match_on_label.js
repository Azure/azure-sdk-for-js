let nock = require('nock');

module.exports.hash = "235dc8765e482c0ab2e6022e299d00a7";

module.exports.testInfo = {"uniqueName":{"listConfigSetting1A":"listConfigSetting1A158690903037003065","listConfigSetting1B":"listConfigSetting1B158690903037001156","listConfigSettingsLabel":"listConfigSettingsLabel158690903037007171"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting1A158690903037003065', {"key":"listConfigSetting1A158690903037003065","label":"listConfigSettingsLabel158690903037007171","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"qdmcmnO5EPImUo1YU2IRJgCRYMO","key":"listConfigSetting1A158690903037003065","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'ETag',
  '"qdmcmnO5EPImUo1YU2IRJgCRYMO"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQ3;sn=1897447',
  'x-ms-request-id',
  '62479377-d55b-4d36-961f-4a6808b07f5c',
  'x-ms-correlation-request-id',
  '62479377-d55b-4d36-961f-4a6808b07f5c',
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
  .put('/locks/listConfigSetting1A158690903037003065')
  .query(true)
  .reply(200, {"etag":"2ldD6Dp2c10UvzdbazKzwLItegY","key":"listConfigSetting1A158690903037003065","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"2ldD6Dp2c10UvzdbazKzwLItegY"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQ4;sn=1897448',
  'x-ms-request-id',
  '310d8be3-f205-485c-8f9f-8ba9e4615508',
  'x-ms-correlation-request-id',
  '310d8be3-f205-485c-8f9f-8ba9e4615508',
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
  .put('/kv/listConfigSetting1A158690903037003065', {"key":"listConfigSetting1A158690903037003065","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"MCAjPCrKJzixJVLDqPXCirNeMi3","key":"listConfigSetting1A158690903037003065","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"MCAjPCrKJzixJVLDqPXCirNeMi3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQ5;sn=1897449',
  'x-ms-request-id',
  '67ab88ff-b003-4e40-a57b-afded577cb6f',
  'x-ms-correlation-request-id',
  '67ab88ff-b003-4e40-a57b-afded577cb6f',
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
  .put('/kv/listConfigSetting1B158690903037001156', {"key":"listConfigSetting1B158690903037001156","label":"listConfigSettingsLabel158690903037007171","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"isPjtyAoDTuQ3liVuoelGgE1Vrw","key":"listConfigSetting1B158690903037001156","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"isPjtyAoDTuQ3liVuoelGgE1Vrw"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDUw;sn=1897450',
  'x-ms-request-id',
  '7db703f1-4a42-4b7b-ad16-71180d22d561',
  'x-ms-correlation-request-id',
  '7db703f1-4a42-4b7b-ad16-71180d22d561',
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
  .put('/kv/listConfigSetting1B158690903037001156', {"key":"listConfigSetting1B158690903037001156","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"YoaKB1OLuJ1kuZ3utusgSMYFLVl","key":"listConfigSetting1B158690903037001156","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:51 GMT',
  'ETag',
  '"YoaKB1OLuJ1kuZ3utusgSMYFLVl"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDUx;sn=1897451',
  'x-ms-request-id',
  '9b7f99ff-28b7-46ad-8db8-66de22798f9a',
  'x-ms-correlation-request-id',
  '9b7f99ff-28b7-46ad-8db8-66de22798f9a',
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
  .reply(200, {"items":[{"etag":"2ldD6Dp2c10UvzdbazKzwLItegY","key":"listConfigSetting1A158690903037003065","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"},{"etag":"isPjtyAoDTuQ3liVuoelGgE1Vrw","key":"listConfigSetting1B158690903037001156","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}]}, [
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
  'zAJw6V16=NjotMSMxODk3NDUx;sn=1897451',
  'x-ms-request-id',
  '9db51dec-1f5e-4e9a-a6c7-bdbdfe70483e',
  'x-ms-correlation-request-id',
  '9db51dec-1f5e-4e9a-a6c7-bdbdfe70483e',
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
  .reply(200, {"items":[{"etag":"2ldD6Dp2c10UvzdbazKzwLItegY","key":"listConfigSetting1A158690903037003065","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:51+00:00"},{"etag":"isPjtyAoDTuQ3liVuoelGgE1Vrw","key":"listConfigSetting1B158690903037001156","label":"listConfigSettingsLabel158690903037007171","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:51+00:00"}]}, [
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
  'zAJw6V16=NjotMSMxODk3NDUx;sn=1897451',
  'x-ms-request-id',
  '05e07b83-7d10-43f7-a20c-3ac13b09027d',
  'x-ms-correlation-request-id',
  '05e07b83-7d10-43f7-a20c-3ac13b09027d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
