let nock = require('nock');

module.exports.hash = "36c45deb5d1cd061515bbc69e58dc143";

module.exports.testInfo = {"uniqueName":{"listConfigSetting3A":"listConfigSetting3A158690903190908309","listConfigSetting3B":"listConfigSetting3B158690903190906698","listConfigSettingsLabel":"listConfigSettingsLabel158690903190909389"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting3A158690903190908309', {"key":"listConfigSetting3A158690903190908309","label":"listConfigSettingsLabel158690903190909389","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"gh3y3GrZfNoxB5QKa9OExmRSQeB","key":"listConfigSetting3A158690903190908309","label":"listConfigSettingsLabel158690903190909389","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"gh3y3GrZfNoxB5QKa9OExmRSQeB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU3;sn=1897457',
  'x-ms-request-id',
  '3818520e-bc91-439d-9c6b-11615d55482a',
  'x-ms-correlation-request-id',
  '3818520e-bc91-439d-9c6b-11615d55482a',
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
  .put('/locks/listConfigSetting3A158690903190908309')
  .query(true)
  .reply(200, {"etag":"0A2G55wJdfKoShhOnbo7kTNwYtJ","key":"listConfigSetting3A158690903190908309","label":"listConfigSettingsLabel158690903190909389","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"0A2G55wJdfKoShhOnbo7kTNwYtJ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU4;sn=1897458',
  'x-ms-request-id',
  'a25f20d2-d32d-4697-9bfd-bd323d42ab54',
  'x-ms-correlation-request-id',
  'a25f20d2-d32d-4697-9bfd-bd323d42ab54',
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
  .put('/kv/listConfigSetting3A158690903190908309', {"key":"listConfigSetting3A158690903190908309","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"qvgb1US7etpONkh2WgmcJo8IgXq","key":"listConfigSetting3A158690903190908309","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"qvgb1US7etpONkh2WgmcJo8IgXq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDU5;sn=1897459',
  'x-ms-request-id',
  '0f76d5db-8bd0-4881-acb4-2310331562e5',
  'x-ms-correlation-request-id',
  '0f76d5db-8bd0-4881-acb4-2310331562e5',
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
  .put('/kv/listConfigSetting3B158690903190906698', {"key":"listConfigSetting3B158690903190906698","label":"listConfigSettingsLabel158690903190909389","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"94LgpeHz20kexELh9GcU3TMHAyy","key":"listConfigSetting3B158690903190906698","label":"listConfigSettingsLabel158690903190909389","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"94LgpeHz20kexELh9GcU3TMHAyy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYw;sn=1897460',
  'x-ms-request-id',
  'a29989ea-cf9d-4c73-ace1-c80312c6ff23',
  'x-ms-correlation-request-id',
  'a29989ea-cf9d-4c73-ace1-c80312c6ff23',
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
  .put('/kv/listConfigSetting3B158690903190906698', {"key":"listConfigSetting3B158690903190906698","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"VgXo97b7agt7vyIw92A8jii3hqI","key":"listConfigSetting3B158690903190906698","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'ETag',
  '"VgXo97b7agt7vyIw92A8jii3hqI"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYx;sn=1897461',
  'x-ms-request-id',
  '06077cae-c660-4b46-89e1-a4175767c0cb',
  'x-ms-correlation-request-id',
  '06077cae-c660-4b46-89e1-a4175767c0cb',
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
  .reply(200, {"items":[{"etag":"qvgb1US7etpONkh2WgmcJo8IgXq","key":"listConfigSetting3A158690903190908309","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"},{"etag":"0A2G55wJdfKoShhOnbo7kTNwYtJ","key":"listConfigSetting3A158690903190908309","label":"listConfigSettingsLabel158690903190909389","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:52+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYx;sn=1897461',
  'x-ms-request-id',
  'd74d1a44-fca2-405d-8b67-c188d3cac9de',
  'x-ms-correlation-request-id',
  'd74d1a44-fca2-405d-8b67-c188d3cac9de',
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
  .reply(200, {"items":[{"etag":"qvgb1US7etpONkh2WgmcJo8IgXq","key":"listConfigSetting3A158690903190908309","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:52+00:00"},{"etag":"0A2G55wJdfKoShhOnbo7kTNwYtJ","key":"listConfigSetting3A158690903190908309","label":"listConfigSettingsLabel158690903190909389","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:52+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYx;sn=1897461',
  'x-ms-request-id',
  '0dd86963-5f9e-488a-86e7-7787c03df36e',
  'x-ms-correlation-request-id',
  '0dd86963-5f9e-488a-86e7-7787c03df36e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
