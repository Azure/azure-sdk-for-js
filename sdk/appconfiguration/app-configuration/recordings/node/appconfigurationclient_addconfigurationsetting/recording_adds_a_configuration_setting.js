let nock = require('nock');

module.exports.hash = "c723a73068595f93a33642e63dcd631e";

module.exports.testInfo = {"uniqueName":{"addConfigTest":"addConfigTest158690902595307068"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigTest158690902595307068', {"key":"addConfigTest158690902595307068","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"nGgsouGWMWyaZghznmXYNVVymwq","key":"addConfigTest158690902595307068","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"nGgsouGWMWyaZghznmXYNVVymwq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI2;sn=1897426',
  'x-ms-request-id',
  '0ca252bb-eb0c-4879-a1f6-ff1ab54e4d92',
  'x-ms-correlation-request-id',
  '0ca252bb-eb0c-4879-a1f6-ff1ab54e4d92',
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
  .delete('/kv/addConfigTest158690902595307068')
  .query(true)
  .reply(200, {"etag":"nGgsouGWMWyaZghznmXYNVVymwq","key":"addConfigTest158690902595307068","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"nGgsouGWMWyaZghznmXYNVVymwq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI3;sn=1897427',
  'x-ms-request-id',
  'ab74b0f5-01fb-4354-b946-274f7dee1aa6',
  'x-ms-correlation-request-id',
  'ab74b0f5-01fb-4354-b946-274f7dee1aa6',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
