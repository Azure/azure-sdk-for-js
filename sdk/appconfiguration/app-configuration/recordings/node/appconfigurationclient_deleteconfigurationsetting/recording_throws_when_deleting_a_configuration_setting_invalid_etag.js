let nock = require('nock');

module.exports.hash = "f3e1fc91f56aaf431d3b42a3d3ef102f";

module.exports.testInfo = {"uniqueName":{"deleteConfigTestBadEtag":"deleteConfigTestBadEtag158690902729303433"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTestBadEtag158690902729303433', {"key":"deleteConfigTestBadEtag158690902729303433","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"1quvgGFPeN19SGIpyHhI1AUMADh","key":"deleteConfigTestBadEtag158690902729303433","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'ETag',
  '"1quvgGFPeN19SGIpyHhI1AUMADh"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM0;sn=1897434',
  'x-ms-request-id',
  '2a6ca50c-bcdc-46d9-8b27-32baaf0c1aa1',
  'x-ms-correlation-request-id',
  '2a6ca50c-bcdc-46d9-8b27-32baaf0c1aa1',
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
  .delete('/kv/deleteConfigTestBadEtag158690902729303433')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'ac05e2a1-e059-42da-b756-822ba39bd58e',
  'x-ms-correlation-request-id',
  'ac05e2a1-e059-42da-b756-822ba39bd58e',
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
  .delete('/kv/deleteConfigTestBadEtag158690902729303433')
  .query(true)
  .reply(200, {"etag":"1quvgGFPeN19SGIpyHhI1AUMADh","key":"deleteConfigTestBadEtag158690902729303433","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'ETag',
  '"1quvgGFPeN19SGIpyHhI1AUMADh"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM1;sn=1897435',
  'x-ms-request-id',
  'ed26b7d2-e8e9-4640-9ef1-baffe442e175',
  'x-ms-correlation-request-id',
  'ed26b7d2-e8e9-4640-9ef1-baffe442e175',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
