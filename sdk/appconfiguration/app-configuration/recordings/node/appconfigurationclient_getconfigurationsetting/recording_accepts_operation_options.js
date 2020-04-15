let nock = require('nock');

module.exports.hash = "995b251f9a73db2d1edd27246f757f99";

module.exports.testInfo = {"uniqueName":{"getConfigTest":"getConfigTest158690902820003126"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigTest158690902820003126', {"key":"getConfigTest158690902820003126","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"ujUNtaRTpyd2gF5ePVoS5DUIdgM","key":"getConfigTest158690902820003126","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
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
  '"ujUNtaRTpyd2gF5ePVoS5DUIdgM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM5;sn=1897439',
  'x-ms-request-id',
  '61d37229-7dc7-42f4-87c2-7bdad416b437',
  'x-ms-correlation-request-id',
  '61d37229-7dc7-42f4-87c2-7bdad416b437',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
