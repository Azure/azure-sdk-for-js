let nock = require('nock');

module.exports.hash = "a88408a95d986c398f06705cc4e430f4";

module.exports.testInfo = {"uniqueName":{"addConfigSample":"addConfigSample158690902583609931"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigSample158690902583609931', {"key":"addConfigSample158690902583609931","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"LSq7qUPOmy5XUHwDFJwDV7784Zh","key":"addConfigSample158690902583609931","label":null,"content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"LSq7qUPOmy5XUHwDFJwDV7784Zh"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI1;sn=1897425',
  'x-ms-request-id',
  '9e0c52b5-d771-4649-85f4-d93a2afd775e',
  'x-ms-correlation-request-id',
  '9e0c52b5-d771-4649-85f4-d93a2afd775e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
