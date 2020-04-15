let nock = require('nock');

module.exports.hash = "52b712e1ff1461072a603b09200639ee";

module.exports.testInfo = {"uniqueName":{"listConfigSetting6A":"listConfigSetting6A158690903449601121","listConfigSetting6B":"listConfigSetting6B158690903449607253","listConfigSettingsLabel":"listConfigSettingsLabel158690903449602447"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting6A158690903449601121', {"key":"listConfigSetting6A158690903449601121","label":"listConfigSettingsLabel158690903449602447","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"jywRGOcZpWgBm5GnTAyULuyqOOU","key":"listConfigSetting6A158690903449601121","label":"listConfigSettingsLabel158690903449602447","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:55+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'ETag',
  '"jywRGOcZpWgBm5GnTAyULuyqOOU"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcy;sn=1897472',
  'x-ms-request-id',
  'ebfff26a-6a77-4c5d-ac5c-d446c44bf22e',
  'x-ms-correlation-request-id',
  'ebfff26a-6a77-4c5d-ac5c-d446c44bf22e',
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
  .put('/locks/listConfigSetting6A158690903449601121')
  .query(true)
  .reply(200, {"etag":"RbJw5dboH8yw8TTPdjhGcLVvX3k","key":"listConfigSetting6A158690903449601121","label":"listConfigSettingsLabel158690903449602447","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:55+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'ETag',
  '"RbJw5dboH8yw8TTPdjhGcLVvX3k"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDcz;sn=1897473',
  'x-ms-request-id',
  'cc951c45-7042-456d-8663-c682d5e9f25b',
  'x-ms-correlation-request-id',
  'cc951c45-7042-456d-8663-c682d5e9f25b',
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
  .put('/kv/listConfigSetting6A158690903449601121', {"key":"listConfigSetting6A158690903449601121","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"6PZpUc3QSYBGX3pkZmFGgbJhzjy","key":"listConfigSetting6A158690903449601121","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:55+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'ETag',
  '"6PZpUc3QSYBGX3pkZmFGgbJhzjy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDc0;sn=1897474',
  'x-ms-request-id',
  '6ed80112-4eff-4303-bbbb-c8088517f3df',
  'x-ms-correlation-request-id',
  '6ed80112-4eff-4303-bbbb-c8088517f3df',
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
  .put('/kv/listConfigSetting6B158690903449607253', {"key":"listConfigSetting6B158690903449607253","label":"listConfigSettingsLabel158690903449602447","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"CmxVhMV8WciLipj5Gw7T0robzZD","key":"listConfigSetting6B158690903449607253","label":"listConfigSettingsLabel158690903449602447","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:55+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'ETag',
  '"CmxVhMV8WciLipj5Gw7T0robzZD"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDc1;sn=1897475',
  'x-ms-request-id',
  'b740af42-9ea9-4139-86e9-02a1888ffbb9',
  'x-ms-correlation-request-id',
  'b740af42-9ea9-4139-86e9-02a1888ffbb9',
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
  .put('/kv/listConfigSetting6B158690903449607253', {"key":"listConfigSetting6B158690903449607253","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"6Cjd6xgoWDzmyBzIkjCe6cZWOgM","key":"listConfigSetting6B158690903449607253","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:55+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'ETag',
  '"6Cjd6xgoWDzmyBzIkjCe6cZWOgM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDc2;sn=1897476',
  'x-ms-request-id',
  'd451f872-0e58-4e20-bd6d-b717a068f199',
  'x-ms-correlation-request-id',
  'd451f872-0e58-4e20-bd6d-b717a068f199',
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
  .reply(200, {"items":[{"etag":"I6xPGQ7JN7MRJovBCZudfTOJ6wg","key":"listConfigSettingA158690550240809995","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"8lPwdOeMCB3oTYwyqHvr5T8Oaoi","key":"listConfigSettingA158690550240809995","label":"listConfigSettingsLabel158690550240800304","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"glKrvFI9nDLYSVqSV9nH3RRejxW","key":"listConfigSettingA158690550308904295","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"sm2YLCNnJxp5U0TkW15GoFJ5puX","key":"listConfigSettingA158690550308904295","label":"listConfigSettingsLabel158690550308907969","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"Py8aBVNIkKeNUTOnwgS41VBtIGL","key":"listConfigSettingA158690550389602308","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:04+00:00"},{"etag":"t39mdE9SB7xwNvr0bEnvjKGOj16","key":"listConfigSettingA158690550389602308","label":"listConfigSettingsLabel158690550389605113","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:04+00:00"},{"etag":"W5W6QPhOEJQIukIx7472KzVw6Pz","key":"listConfigSettingA158690550469605737","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"cu0pADD7K58Xj0u4M0jyoARWev5","key":"listConfigSettingA158690550469605737","label":"listConfigSettingsLabel158690550469604189","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"iP5UEbT2ue27PpObCuocIpQ5wFj","key":"listConfigSettingA158690550528608298","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"xpR4qXWy51ccchwaSN1lwHuj9N5","key":"listConfigSettingA158690550528608298","label":"listConfigSettingsLabel158690550528603565","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"1pn9gXIMODoJEyyGGQyBZSPaSjF","key":"listConfigSettingA158690550586301246","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"LFqOFUZwIkZbKda5L6KStbfSzCp","key":"listConfigSettingA158690550586301246","label":"listConfigSettingsLabel158690550586308900","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"XzqcniMg17wAda3Z9QJM4NFsEcv","key":"listConfigSettingA158690550643406501","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:07+00:00"},{"etag":"M6CEbKFIdTgORct7WQJYID4hHOJ","key":"listConfigSettingA158690550643406501","label":"listConfigSettingsLabel158690550643402034","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:07+00:00"},{"etag":"TunaNlaXph1ferNBW3VpsiwdYGq","key":"listConfigSettingA158690550722500118","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:08+00:00"},{"etag":"hfvNw225klxCWDldSZCenaJsMcu","key":"listConfigSettingA158690550722500118","label":"listConfigSettingsLabel158690550722503861","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:07+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'Link',
  '</kv?key=listConfigSettingA*&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDc2;sn=1897476',
  'x-ms-request-id',
  '4ca7bc75-5c3f-4a2a-8103-93770ff9ed1e',
  'x-ms-correlation-request-id',
  '4ca7bc75-5c3f-4a2a-8103-93770ff9ed1e',
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
  .reply(200, {"items":[{"etag":"I6xPGQ7JN7MRJovBCZudfTOJ6wg","key":"listConfigSettingA158690550240809995","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"8lPwdOeMCB3oTYwyqHvr5T8Oaoi","key":"listConfigSettingA158690550240809995","label":"listConfigSettingsLabel158690550240800304","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"glKrvFI9nDLYSVqSV9nH3RRejxW","key":"listConfigSettingA158690550308904295","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"sm2YLCNnJxp5U0TkW15GoFJ5puX","key":"listConfigSettingA158690550308904295","label":"listConfigSettingsLabel158690550308907969","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:03+00:00"},{"etag":"Py8aBVNIkKeNUTOnwgS41VBtIGL","key":"listConfigSettingA158690550389602308","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:04+00:00"},{"etag":"t39mdE9SB7xwNvr0bEnvjKGOj16","key":"listConfigSettingA158690550389602308","label":"listConfigSettingsLabel158690550389605113","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:04+00:00"},{"etag":"W5W6QPhOEJQIukIx7472KzVw6Pz","key":"listConfigSettingA158690550469605737","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"cu0pADD7K58Xj0u4M0jyoARWev5","key":"listConfigSettingA158690550469605737","label":"listConfigSettingsLabel158690550469604189","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"iP5UEbT2ue27PpObCuocIpQ5wFj","key":"listConfigSettingA158690550528608298","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"xpR4qXWy51ccchwaSN1lwHuj9N5","key":"listConfigSettingA158690550528608298","label":"listConfigSettingsLabel158690550528603565","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:05+00:00"},{"etag":"1pn9gXIMODoJEyyGGQyBZSPaSjF","key":"listConfigSettingA158690550586301246","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"LFqOFUZwIkZbKda5L6KStbfSzCp","key":"listConfigSettingA158690550586301246","label":"listConfigSettingsLabel158690550586308900","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:06+00:00"},{"etag":"XzqcniMg17wAda3Z9QJM4NFsEcv","key":"listConfigSettingA158690550643406501","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:07+00:00"},{"etag":"M6CEbKFIdTgORct7WQJYID4hHOJ","key":"listConfigSettingA158690550643406501","label":"listConfigSettingsLabel158690550643402034","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:07+00:00"},{"etag":"TunaNlaXph1ferNBW3VpsiwdYGq","key":"listConfigSettingA158690550722500118","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-14T23:05:08+00:00"},{"etag":"hfvNw225klxCWDldSZCenaJsMcu","key":"listConfigSettingA158690550722500118","label":"listConfigSettingsLabel158690550722503861","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-14T23:05:07+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 00:03:55 GMT',
  'Link',
  '</kv?key=listConfigSettingA*&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDc2;sn=1897476',
  'x-ms-request-id',
  'b220bd4a-39fe-4e0b-bece-b676ad7e7173',
  'x-ms-correlation-request-id',
  'b220bd4a-39fe-4e0b-bece-b676ad7e7173',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
