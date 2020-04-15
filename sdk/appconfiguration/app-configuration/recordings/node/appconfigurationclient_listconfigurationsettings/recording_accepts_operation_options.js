let nock = require('nock');

module.exports.hash = "0d9a702523df9e4353d002c92fc1f553";

module.exports.testInfo = {"uniqueName":{"listConfigSetting8A":"listConfigSetting8A158690906144004754","listConfigSetting8B":"listConfigSetting8B158690906144004303","listConfigSettingsLabel":"listConfigSettingsLabel158690906144009949"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listConfigSetting8A158690906144004754', {"key":"listConfigSetting8A158690906144004754","label":"listConfigSettingsLabel158690906144009949","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"Di3DVXis7BvOf4STGEWTddoVYAv","key":"listConfigSetting8A158690906144004754","label":"listConfigSettingsLabel158690906144009949","content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:22+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'ETag',
  '"Di3DVXis7BvOf4STGEWTddoVYAv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODgy;sn=1897882',
  'x-ms-request-id',
  'ddfbb207-6b5a-4de4-8d59-a2d34445795b',
  'x-ms-correlation-request-id',
  'ddfbb207-6b5a-4de4-8d59-a2d34445795b',
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
  .put('/locks/listConfigSetting8A158690906144004754')
  .query(true)
  .reply(200, {"etag":"qMJZ5vZ9NJMr1aF0KukbD8jXPFG","key":"listConfigSetting8A158690906144004754","label":"listConfigSettingsLabel158690906144009949","content_type":null,"value":"[A] production value","tags":{},"locked":true,"last_modified":"2020-04-15T00:04:22+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'ETag',
  '"qMJZ5vZ9NJMr1aF0KukbD8jXPFG"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODgz;sn=1897883',
  'x-ms-request-id',
  'd1a555b3-eeac-4228-a5ec-44d0dec2ccf3',
  'x-ms-correlation-request-id',
  'd1a555b3-eeac-4228-a5ec-44d0dec2ccf3',
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
  .put('/kv/listConfigSetting8A158690906144004754', {"key":"listConfigSetting8A158690906144004754","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"z4nxSen8xO7rAldx4wdsFfYCi5R","key":"listConfigSetting8A158690906144004754","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:22+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'ETag',
  '"z4nxSen8xO7rAldx4wdsFfYCi5R"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODg0;sn=1897884',
  'x-ms-request-id',
  'cff79a3c-e346-4e0d-a3ec-0adf189ee18f',
  'x-ms-correlation-request-id',
  'cff79a3c-e346-4e0d-a3ec-0adf189ee18f',
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
  .put('/kv/listConfigSetting8B158690906144004303', {"key":"listConfigSetting8B158690906144004303","label":"listConfigSettingsLabel158690906144009949","value":"[B] production value"})
  .query(true)
  .reply(200, {"etag":"tHhUIDzgaVQNpL4RaixHSJKws2L","key":"listConfigSetting8B158690906144004303","label":"listConfigSettingsLabel158690906144009949","content_type":null,"value":"[B] production value","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:22+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'ETag',
  '"tHhUIDzgaVQNpL4RaixHSJKws2L"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODg1;sn=1897885',
  'x-ms-request-id',
  'f285338a-637a-4e1f-9929-da0b101da2d4',
  'x-ms-correlation-request-id',
  'f285338a-637a-4e1f-9929-da0b101da2d4',
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
  .put('/kv/listConfigSetting8B158690906144004303', {"key":"listConfigSetting8B158690906144004303","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"r6hzd77EsTDo2ecHx6oojE3RPku","key":"listConfigSetting8B158690906144004303","label":null,"content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:22+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'ETag',
  '"r6hzd77EsTDo2ecHx6oojE3RPku"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODg2;sn=1897886',
  'x-ms-request-id',
  '09ba2058-f984-4499-90f2-5d781726be31',
  'x-ms-correlation-request-id',
  '09ba2058-f984-4499-90f2-5d781726be31',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
