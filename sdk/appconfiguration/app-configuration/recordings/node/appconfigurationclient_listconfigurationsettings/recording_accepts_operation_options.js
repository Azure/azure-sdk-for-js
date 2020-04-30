let nock = require('nock');

module.exports.hash = "cb3c4000080f6438fb040390f444b4f1";

module.exports.testInfo = {"uniqueName":{"listConfigSetting8A":"listConfigSetting8A158696684396300885","listConfigSetting8B":"listConfigSetting8B158696684396306851","listConfigSettingsLabel":"listConfigSettingsLabel158696684396302593"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting8A158696684396300885', {"key":"listConfigSetting8A158696684396300885","label":"listConfigSettingsLabel158696684396302593","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"lwKJcguWTQFm70dPMYSoj3RJagQ","key":"listConfigSetting8A158696684396300885","label":"listConfigSettingsLabel158696684396302593","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'ETag',
  '"lwKJcguWTQFm70dPMYSoj3RJagQ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyNzk0;sn=1902794',
  'x-ms-request-id',
  'e9b946ac-336e-4ed5-85e3-e78a8068d403',
  'x-ms-correlation-request-id',
  'e9b946ac-336e-4ed5-85e3-e78a8068d403',
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
  .put('/locks/listConfigSetting8A158696684396300885')
  .query(true)
  .reply(200, {"etag":"tOhVsMgJ7m0eIBpubcX6QU94CRC","key":"listConfigSetting8A158696684396300885","label":"listConfigSettingsLabel158696684396302593","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T16:07:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'ETag',
  '"tOhVsMgJ7m0eIBpubcX6QU94CRC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyNzk1;sn=1902795',
  'x-ms-request-id',
  '30819057-b957-46e2-be2f-27fa7153702b',
  'x-ms-correlation-request-id',
  '30819057-b957-46e2-be2f-27fa7153702b',
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
  .put('/kv/listConfigSetting8A158696684396300885', {"key":"listConfigSetting8A158696684396300885","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"nHgetAHWHcI4R1QxgZPGEQAqJDS","key":"listConfigSetting8A158696684396300885","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'ETag',
  '"nHgetAHWHcI4R1QxgZPGEQAqJDS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyNzk2;sn=1902796',
  'x-ms-request-id',
  '441147a1-f361-42a8-a5bc-ddbf85c446a0',
  'x-ms-correlation-request-id',
  '441147a1-f361-42a8-a5bc-ddbf85c446a0',
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
  .put('/kv/listConfigSetting8B158696684396306851', {"key":"listConfigSetting8B158696684396306851","label":"listConfigSettingsLabel158696684396302593","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"GyKntwYWsZccwWpmehVKfzPfwIk","key":"listConfigSetting8B158696684396306851","label":"listConfigSettingsLabel158696684396302593","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'ETag',
  '"GyKntwYWsZccwWpmehVKfzPfwIk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyNzk3;sn=1902797',
  'x-ms-request-id',
  '57e821fd-e5dc-4631-a5a0-6ac8259e7196',
  'x-ms-correlation-request-id',
  '57e821fd-e5dc-4631-a5a0-6ac8259e7196',
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
  .put('/kv/listConfigSetting8B158696684396306851', {"key":"listConfigSetting8B158696684396306851","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"49MFTsnjgFRp8F0elFm5znaNSfO","key":"listConfigSetting8B158696684396306851","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:25+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:25 GMT',
  'ETag',
  '"49MFTsnjgFRp8F0elFm5znaNSfO"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyNzk4;sn=1902798',
  'x-ms-request-id',
  '9639a71d-3785-42e5-b1bb-9cd9bcef839a',
  'x-ms-correlation-request-id',
  '9639a71d-3785-42e5-b1bb-9cd9bcef839a',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
