let nock = require('nock');

module.exports.hash = "92a1614e2445f227f577c9134f0f03bf";

module.exports.testInfo = {"uniqueName":{"listConfigSetting4A":"listConfigSetting4A158690903269803867","listConfigSetting4B":"listConfigSetting4B158690903269801413","listConfigSettingsLabel":"listConfigSettingsLabel158690903269805514"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting4A158690903269803867', {"key":"listConfigSetting4A158690903269803867","label":"listConfigSettingsLabel158690903269805514","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"C4JP7pqtEaWYe7N5n9GnRElG20G","key":"listConfigSetting4A158690903269803867","label":"listConfigSettingsLabel158690903269805514","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'ETag',
  '"C4JP7pqtEaWYe7N5n9GnRElG20G"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYy;sn=1897462',
  'x-ms-request-id',
  '8b7dad97-73fa-439a-a8ca-35b1f80cc938',
  'x-ms-correlation-request-id',
  '8b7dad97-73fa-439a-a8ca-35b1f80cc938',
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
  .put('/locks/listConfigSetting4A158690903269803867')
  .query(true)
  .reply(200, {"etag":"WO38DJTjl1nBYzF4qB1NwGNDeVE","key":"listConfigSetting4A158690903269803867","label":"listConfigSettingsLabel158690903269805514","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:53+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'ETag',
  '"WO38DJTjl1nBYzF4qB1NwGNDeVE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDYz;sn=1897463',
  'x-ms-request-id',
  'd314362e-1ce5-479e-88f4-6a81671eefce',
  'x-ms-correlation-request-id',
  'd314362e-1ce5-479e-88f4-6a81671eefce',
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
  .put('/kv/listConfigSetting4A158690903269803867', {"key":"listConfigSetting4A158690903269803867","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"GnAEGLot39DpIdHa8LrPCQXONYf","key":"listConfigSetting4A158690903269803867","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'ETag',
  '"GnAEGLot39DpIdHa8LrPCQXONYf"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY0;sn=1897464',
  'x-ms-request-id',
  'd3c7e61c-83c9-4a62-a7fc-e1872367b883',
  'x-ms-correlation-request-id',
  'd3c7e61c-83c9-4a62-a7fc-e1872367b883',
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
  .put('/kv/listConfigSetting4B158690903269801413', {"key":"listConfigSetting4B158690903269801413","label":"listConfigSettingsLabel158690903269805514","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"lMqigBwxqjaskSnYOriagoUQsgF","key":"listConfigSetting4B158690903269801413","label":"listConfigSettingsLabel158690903269805514","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'ETag',
  '"lMqigBwxqjaskSnYOriagoUQsgF"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY1;sn=1897465',
  'x-ms-request-id',
  'cc49e4a1-62c0-40c7-9969-1cd91b3584d7',
  'x-ms-correlation-request-id',
  'cc49e4a1-62c0-40c7-9969-1cd91b3584d7',
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
  .put('/kv/listConfigSetting4B158690903269801413', {"key":"listConfigSetting4B158690903269801413","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"zTAQZzNUGWxaT7aWOzJgdfXQo5w","key":"listConfigSetting4B158690903269801413","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'ETag',
  '"zTAQZzNUGWxaT7aWOzJgdfXQo5w"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY2;sn=1897466',
  'x-ms-request-id',
  '4588efea-6d02-47bd-93f3-90cec74d4f5f',
  'x-ms-correlation-request-id',
  '4588efea-6d02-47bd-93f3-90cec74d4f5f',
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
  .reply(200, {"items":[{"etag":"GnAEGLot39DpIdHa8LrPCQXONYf","key":"listConfigSetting4A158690903269803867","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"},{"etag":"WO38DJTjl1nBYzF4qB1NwGNDeVE","key":"listConfigSetting4A158690903269803867","label":"listConfigSettingsLabel158690903269805514","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY2;sn=1897466',
  'x-ms-request-id',
  'be67f9fc-14f0-4b43-a4d2-58522f880b2f',
  'x-ms-correlation-request-id',
  'be67f9fc-14f0-4b43-a4d2-58522f880b2f',
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
  .reply(200, {"items":[{"etag":"GnAEGLot39DpIdHa8LrPCQXONYf","key":"listConfigSetting4A158690903269803867","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:53+00:00"},{"etag":"WO38DJTjl1nBYzF4qB1NwGNDeVE","key":"listConfigSetting4A158690903269803867","label":"listConfigSettingsLabel158690903269805514","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:03:53+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDY2;sn=1897466',
  'x-ms-request-id',
  '92f10c23-3481-435f-b6b2-26014bd0a399',
  'x-ms-correlation-request-id',
  '92f10c23-3481-435f-b6b2-26014bd0a399',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
