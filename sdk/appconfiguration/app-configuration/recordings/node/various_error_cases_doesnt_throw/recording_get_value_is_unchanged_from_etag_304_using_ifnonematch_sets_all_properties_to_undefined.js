let nock = require('nock');

module.exports.hash = "3e43640fc7aa3820126953a1433f6e70";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907582505394"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907582505394', {"key":"etags158690907582505394","value":"world"})
  .query(true)
  .reply(200, {"etag":"LtNcifcNzBuwQCMt34cPRE3ToMs","key":"etags158690907582505394","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"LtNcifcNzBuwQCMt34cPRE3ToMs"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM3;sn=1897937',
  'x-ms-request-id',
  '3294db76-ae4b-4e2d-b77e-cb36415fb7c1',
  'x-ms-correlation-request-id',
  '3294db76-ae4b-4e2d-b77e-cb36415fb7c1',
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
  .get('/kv/etags158690907582505394')
  .query(true)
  .reply(304, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Connection',
  'close',
  'ETag',
  '"LtNcifcNzBuwQCMt34cPRE3ToMs"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM3;sn=1897937',
  'x-ms-request-id',
  '1f13c54e-c1d3-4787-a4a6-23eb31d77b7e',
  'x-ms-correlation-request-id',
  '1f13c54e-c1d3-4787-a4a6-23eb31d77b7e',
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
  .reply(200, {"items":[{"etag":"LtNcifcNzBuwQCMt34cPRE3ToMs","key":"etags158690907582505394","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM3;sn=1897937',
  'x-ms-request-id',
  '49ee3e5b-f583-4a95-959d-69948af42ade',
  'x-ms-correlation-request-id',
  '49ee3e5b-f583-4a95-959d-69948af42ade',
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
  .delete('/kv/etags158690907582505394')
  .query(true)
  .reply(200, {"etag":"LtNcifcNzBuwQCMt34cPRE3ToMs","key":"etags158690907582505394","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"LtNcifcNzBuwQCMt34cPRE3ToMs"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM4;sn=1897938',
  'x-ms-request-id',
  '6c0a2bd8-c7fb-4531-b566-c3ebd622dee6',
  'x-ms-correlation-request-id',
  '6c0a2bd8-c7fb-4531-b566-c3ebd622dee6',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
