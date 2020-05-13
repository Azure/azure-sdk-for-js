let nock = require('nock');

module.exports.hash = "c723a73068595f93a33642e63dcd631e";

module.exports.testInfo = {"uniqueName":{"addConfigTest":"addConfigTest158696680766802568"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigTest158696680766802568', {"key":"addConfigTest158696680766802568","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"ILpO3bthMWrtTYxDcA7JrbBSjb9","key":"addConfigTest158696680766802568","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'ETag',
  '"ILpO3bthMWrtTYxDcA7JrbBSjb9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM4;sn=1902338',
  'x-ms-request-id',
  '0c75eaae-6fad-4cb5-8973-52b6d0b43fa4',
  'x-ms-correlation-request-id',
  '0c75eaae-6fad-4cb5-8973-52b6d0b43fa4',
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
  .delete('/kv/addConfigTest158696680766802568')
  .query(true)
  .reply(200, {"etag":"ILpO3bthMWrtTYxDcA7JrbBSjb9","key":"addConfigTest158696680766802568","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'ETag',
  '"ILpO3bthMWrtTYxDcA7JrbBSjb9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM5;sn=1902339',
  'x-ms-request-id',
  '43d62c92-9d58-44b2-b413-2a3024186646',
  'x-ms-correlation-request-id',
  '43d62c92-9d58-44b2-b413-2a3024186646',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
