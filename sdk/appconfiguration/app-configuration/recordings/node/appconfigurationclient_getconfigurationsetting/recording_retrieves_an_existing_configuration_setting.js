let nock = require('nock');

module.exports.hash = "f628f69e7ae30c2b06ef11cb7eef9b77";

module.exports.testInfo = {"uniqueName":{"getConfigTest":"getConfigTest158696680948400390"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigTest158696680948400390', {"key":"getConfigTest158696680948400390","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"k2vLPiIab3brZo75d0QFH5IkKKu","key":"getConfigTest158696680948400390","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"k2vLPiIab3brZo75d0QFH5IkKKu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ5;sn=1902349',
  'x-ms-request-id',
  '94b9672d-fb4e-4e17-941a-83250c21e2d4',
  'x-ms-correlation-request-id',
  '94b9672d-fb4e-4e17-941a-83250c21e2d4',
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
  .get('/kv/getConfigTest158696680948400390')
  .query(true)
  .reply(200, {"etag":"k2vLPiIab3brZo75d0QFH5IkKKu","key":"getConfigTest158696680948400390","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"k2vLPiIab3brZo75d0QFH5IkKKu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ5;sn=1902349',
  'x-ms-request-id',
  '035c60e6-cfab-4445-9793-7587066e5462',
  'x-ms-correlation-request-id',
  '035c60e6-cfab-4445-9793-7587066e5462',
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
  .delete('/kv/getConfigTest158696680948400390')
  .query(true)
  .reply(200, {"etag":"k2vLPiIab3brZo75d0QFH5IkKKu","key":"getConfigTest158696680948400390","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:06:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:50 GMT',
  'ETag',
  '"k2vLPiIab3brZo75d0QFH5IkKKu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzUw;sn=1902350',
  'x-ms-request-id',
  'bdc2aaac-2932-4c23-bff9-0a2beae3ea72',
  'x-ms-correlation-request-id',
  'bdc2aaac-2932-4c23-bff9-0a2beae3ea72',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
