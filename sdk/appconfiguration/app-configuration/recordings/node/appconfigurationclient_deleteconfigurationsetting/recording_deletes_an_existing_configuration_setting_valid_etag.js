let nock = require('nock');

module.exports.hash = "4fb1fb0853b323b7edced6163fbe0204";

module.exports.testInfo = {"uniqueName":{"deleteConfigTestEtag":"deleteConfigTestEtag158690902685108651"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTestEtag158690902685108651', {"key":"deleteConfigTestEtag158690902685108651","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"utSc7Jagz0WZEChNaRRTorVCxSM","key":"deleteConfigTestEtag158690902685108651","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'ETag',
  '"utSc7Jagz0WZEChNaRRTorVCxSM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDMy;sn=1897432',
  'x-ms-request-id',
  'd4f628c5-c8d4-4b61-94d7-f4dc9f6d7289',
  'x-ms-correlation-request-id',
  'd4f628c5-c8d4-4b61-94d7-f4dc9f6d7289',
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
  .delete('/kv/deleteConfigTestEtag158690902685108651')
  .query(true)
  .reply(200, {"etag":"utSc7Jagz0WZEChNaRRTorVCxSM","key":"deleteConfigTestEtag158690902685108651","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
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
  '"utSc7Jagz0WZEChNaRRTorVCxSM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDMz;sn=1897433',
  'x-ms-request-id',
  '876652ae-bfa4-4e30-a520-bb1146423d3b',
  'x-ms-correlation-request-id',
  '876652ae-bfa4-4e30-a520-bb1146423d3b',
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
  .get('/kv/deleteConfigTestEtag158690902685108651')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '81992ea9-755b-43be-80e5-5e88a2d2fe9f',
  'x-ms-correlation-request-id',
  '81992ea9-755b-43be-80e5-5e88a2d2fe9f',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
