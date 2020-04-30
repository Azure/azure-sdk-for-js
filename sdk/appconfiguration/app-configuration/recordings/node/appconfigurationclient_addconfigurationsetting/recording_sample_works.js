let nock = require('nock');

module.exports.hash = "a88408a95d986c398f06705cc4e430f4";

module.exports.testInfo = {"uniqueName":{"addConfigSample":"addConfigSample158696680755302258"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigSample158696680755302258', {"key":"addConfigSample158696680755302258","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"kFVzI5dvAs85jW0BP58EtBAYsJw","key":"addConfigSample158696680755302258","label":null,"content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:48+00:00"}, [
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
  '"kFVzI5dvAs85jW0BP58EtBAYsJw"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM3;sn=1902337',
  'x-ms-request-id',
  '9f204f43-6795-4872-9c0a-52e5ed938ec5',
  'x-ms-correlation-request-id',
  '9f204f43-6795-4872-9c0a-52e5ed938ec5',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
