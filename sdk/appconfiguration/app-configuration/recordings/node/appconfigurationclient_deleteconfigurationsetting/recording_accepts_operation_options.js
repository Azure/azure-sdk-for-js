let nock = require('nock');

module.exports.hash = "9cd9f4e5d559531a3c64d5f6f532d222";

module.exports.testInfo = {"uniqueName":{"deleteConfigTest":"deleteConfigTest158690902763605027"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTest158690902763605027', {"key":"deleteConfigTest158690902763605027","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"iMBbFgP5mycOYJYFas44AFpdhXv","key":"deleteConfigTest158690902763605027","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
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
  '"iMBbFgP5mycOYJYFas44AFpdhXv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDM2;sn=1897436',
  'x-ms-request-id',
  'd4164814-a59b-4a39-8dcc-d3c13a2466db',
  'x-ms-correlation-request-id',
  'd4164814-a59b-4a39-8dcc-d3c13a2466db',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
