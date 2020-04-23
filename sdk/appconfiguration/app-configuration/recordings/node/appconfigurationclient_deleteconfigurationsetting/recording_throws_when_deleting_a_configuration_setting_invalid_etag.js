let nock = require('nock');

module.exports.hash = "f3e1fc91f56aaf431d3b42a3d3ef102f";

module.exports.testInfo = {"uniqueName":{"deleteConfigTestBadEtag":"deleteConfigTestBadEtag158696680902500550"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTestBadEtag158696680902500550', {"key":"deleteConfigTestBadEtag158696680902500550","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"4AmZYlSC2vf3iMRn6FnLMdBx9eK","key":"deleteConfigTestBadEtag158696680902500550","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:49+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'ETag',
  '"4AmZYlSC2vf3iMRn6FnLMdBx9eK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ2;sn=1902346',
  'x-ms-request-id',
  'a6ec56cb-b0c6-4e73-9dcb-6a6da677f7c6',
  'x-ms-correlation-request-id',
  'a6ec56cb-b0c6-4e73-9dcb-6a6da677f7c6',
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
  .delete('/kv/deleteConfigTestBadEtag158696680902500550')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'd653361a-e504-4722-895d-a08f9a6c2d10',
  'x-ms-correlation-request-id',
  'd653361a-e504-4722-895d-a08f9a6c2d10',
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
  .delete('/kv/deleteConfigTestBadEtag158696680902500550')
  .query(true)
  .reply(200, {"etag":"4AmZYlSC2vf3iMRn6FnLMdBx9eK","key":"deleteConfigTestBadEtag158696680902500550","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:49+00:00"}, [
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
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'ETag',
  '"4AmZYlSC2vf3iMRn6FnLMdBx9eK"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ3;sn=1902347',
  'x-ms-request-id',
  'b060fc9c-2418-44d5-aee5-1ff2e21613cc',
  'x-ms-correlation-request-id',
  'b060fc9c-2418-44d5-aee5-1ff2e21613cc',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
