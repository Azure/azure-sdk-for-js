let nock = require('nock');

module.exports.hash = "f628f69e7ae30c2b06ef11cb7eef9b77";

module.exports.testInfo = {"uniqueName":{"getConfigTest":"getConfigTest158690902775609727"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigTest158690902775609727', {"key":"getConfigTest158690902775609727","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"IxazrMPZPOx1DV9T0TP343Mzx2X","key":"getConfigTest158690902775609727","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'ETag',
  '"IxazrMPZPOx1DV9T0TP343Mzx2X"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM3;sn=1897437',
  'x-ms-request-id',
  'f2f1a007-a396-4030-86d6-e72f1d380b94',
  'x-ms-correlation-request-id',
  'f2f1a007-a396-4030-86d6-e72f1d380b94',
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
  .get('/kv/getConfigTest158690902775609727')
  .query(true)
  .reply(200, {"etag":"IxazrMPZPOx1DV9T0TP343Mzx2X","key":"getConfigTest158690902775609727","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'ETag',
  '"IxazrMPZPOx1DV9T0TP343Mzx2X"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM3;sn=1897437',
  'x-ms-request-id',
  '12f018c4-801b-4998-86d4-435627455346',
  'x-ms-correlation-request-id',
  '12f018c4-801b-4998-86d4-435627455346',
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
  .delete('/kv/getConfigTest158690902775609727')
  .query(true)
  .reply(200, {"etag":"IxazrMPZPOx1DV9T0TP343Mzx2X","key":"getConfigTest158690902775609727","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'ETag',
  '"IxazrMPZPOx1DV9T0TP343Mzx2X"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM4;sn=1897438',
  'x-ms-request-id',
  '87410ead-56e0-43f2-8fd3-530da96b928c',
  'x-ms-correlation-request-id',
  '87410ead-56e0-43f2-8fd3-530da96b928c',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
