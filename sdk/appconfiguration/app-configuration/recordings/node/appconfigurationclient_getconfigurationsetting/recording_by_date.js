let nock = require('nock');

module.exports.hash = "f819341afd79be61d1a42e20125cb43a";

module.exports.testInfo = {"uniqueName":{"getConfigurationSettingByDate":"getConfigurationSettingByDate158696681005403085"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigurationSettingByDate158696681005403085', {"key":"getConfigurationSettingByDate158696681005403085","value":"value1"})
  .query(true)
  .reply(200, {"etag":"T2q340uoEItxn8BLv9ulHmxRHNP","key":"getConfigurationSettingByDate158696681005403085","label":null,"content_type":null,"value":"value1","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"T2q340uoEItxn8BLv9ulHmxRHNP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzUy;sn=1902352',
  'x-ms-request-id',
  'def642f0-eb4e-40c0-ac8d-b1af99d2b6ee',
  'x-ms-correlation-request-id',
  'def642f0-eb4e-40c0-ac8d-b1af99d2b6ee',
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
  .put('/kv/getConfigurationSettingByDate158696681005403085', {"key":"getConfigurationSettingByDate158696681005403085","value":"value2"})
  .query(true)
  .reply(200, {"etag":"18I9VNOGpFq0vB8nuWLHZa09VhP","key":"getConfigurationSettingByDate158696681005403085","label":null,"content_type":null,"value":"value2","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:51+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:51 GMT',
  'ETag',
  '"18I9VNOGpFq0vB8nuWLHZa09VhP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzUz;sn=1902353',
  'x-ms-request-id',
  'b1b92e46-5f59-42f4-a0f9-d849b8c246b3',
  'x-ms-correlation-request-id',
  'b1b92e46-5f59-42f4-a0f9-d849b8c246b3',
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
  .get('/kv/getConfigurationSettingByDate158696681005403085')
  .query(true)
  .reply(200, {"etag":"T2q340uoEItxn8BLv9ulHmxRHNP","key":"getConfigurationSettingByDate158696681005403085","label":null,"content_type":null,"value":"value1","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:51 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"T2q340uoEItxn8BLv9ulHmxRHNP"',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'Link',
  '</kv/getConfigurationSettingByDate158696681005403085?api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzUz;sn=1902353',
  'x-ms-request-id',
  '1a22a4ea-b931-44d9-84d2-8dd060326f14',
  'x-ms-correlation-request-id',
  '1a22a4ea-b931-44d9-84d2-8dd060326f14',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
