let nock = require('nock');

module.exports.hash = "c7f2f8dfe5475136213aecfec24db9fd";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696685579700720"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696685579700720', {"key":"etags158696685579700720","value":"world"})
  .query(true)
  .reply(200, {"etag":"Trm6vfgggQG9015brLBUoDl7T2M","key":"etags158696685579700720","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'ETag',
  '"Trm6vfgggQG9015brLBUoDl7T2M"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODM1;sn=1902835',
  'x-ms-request-id',
  'c28c9120-1fd2-4daf-98e8-8383e5d4cba3',
  'x-ms-correlation-request-id',
  'c28c9120-1fd2-4daf-98e8-8383e5d4cba3',
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
  .get('/kv/non-existent%20key%20etags158696685579700720')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '62b29868-f2af-4e2e-8c16-d813233207a6',
  'x-ms-correlation-request-id',
  '62b29868-f2af-4e2e-8c16-d813233207a6',
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
  .reply(200, {"items":[{"etag":"Trm6vfgggQG9015brLBUoDl7T2M","key":"etags158696685579700720","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODM1;sn=1902835',
  'x-ms-request-id',
  '1afe2aea-8e1d-4eab-b633-126996f9242f',
  'x-ms-correlation-request-id',
  '1afe2aea-8e1d-4eab-b633-126996f9242f',
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
  .delete('/kv/etags158696685579700720')
  .query(true)
  .reply(200, {"etag":"Trm6vfgggQG9015brLBUoDl7T2M","key":"etags158696685579700720","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'ETag',
  '"Trm6vfgggQG9015brLBUoDl7T2M"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODM2;sn=1902836',
  'x-ms-request-id',
  '8182be5e-df3e-4c71-8889-1f8d6978af16',
  'x-ms-correlation-request-id',
  '8182be5e-df3e-4c71-8889-1f8d6978af16',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
