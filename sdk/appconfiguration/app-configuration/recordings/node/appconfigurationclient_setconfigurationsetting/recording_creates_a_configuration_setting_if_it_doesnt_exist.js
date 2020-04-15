let nock = require('nock');

module.exports.hash = "5220d9a00f33d6b9f6088a736be8fa1d";

module.exports.testInfo = {"uniqueName":{"setConfigTestNA":"setConfigTestNA158690907306808693"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTestNA158690907306808693', {"key":"setConfigTestNA158690907306808693","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"GSAotm2ltePnPm6oQhH6Np53x2F","key":"setConfigTestNA158690907306808693","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"GSAotm2ltePnPm6oQhH6Np53x2F"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTIy;sn=1897922',
  'x-ms-request-id',
  '97677d53-a641-477d-8ab4-e0e30f907e0d',
  'x-ms-correlation-request-id',
  '97677d53-a641-477d-8ab4-e0e30f907e0d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
