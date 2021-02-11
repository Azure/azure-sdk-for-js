let nock = require('nock');

module.exports.hash = "4fb1fb0853b323b7edced6163fbe0204";

module.exports.testInfo = {"uniqueName":{"deleteConfigTestEtag":"deleteConfigTestEtag158696680857701029"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTestEtag158696680857701029', {"key":"deleteConfigTestEtag158696680857701029","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"hp1zotRxKLA4ZyWuMDGsn2BXmg9","key":"deleteConfigTestEtag158696680857701029","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:49+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'ETag',
  '"hp1zotRxKLA4ZyWuMDGsn2BXmg9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ0;sn=1902344',
  'x-ms-request-id',
  '4d9e1c18-77b3-4a61-85f4-cc05a15385f2',
  'x-ms-correlation-request-id',
  '4d9e1c18-77b3-4a61-85f4-cc05a15385f2',
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
  .delete('/kv/deleteConfigTestEtag158696680857701029')
  .query(true)
  .reply(200, {"etag":"hp1zotRxKLA4ZyWuMDGsn2BXmg9","key":"deleteConfigTestEtag158696680857701029","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:49+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:49 GMT',
  'ETag',
  '"hp1zotRxKLA4ZyWuMDGsn2BXmg9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzQ1;sn=1902345',
  'x-ms-request-id',
  '89a66b95-7be7-44c0-b478-698d0cb87c5b',
  'x-ms-correlation-request-id',
  '89a66b95-7be7-44c0-b478-698d0cb87c5b',
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
  .get('/kv/deleteConfigTestEtag158696680857701029')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:48 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'dab2a453-152e-439b-92ae-aaa5ba2f1448',
  'x-ms-correlation-request-id',
  'dab2a453-152e-439b-92ae-aaa5ba2f1448',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
