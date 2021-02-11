let nock = require('nock');

module.exports.hash = "f00c8046766d6e1523f2358d654d2032";

module.exports.testInfo = {"uniqueName":{"setConfigTest":"setConfigTest158696685504101004"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTest158696685504101004', {"key":"setConfigTest158696685504101004","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"61DQavaNI30SlOc3aOIcFRunkz3","key":"setConfigTest158696685504101004","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
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
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"61DQavaNI30SlOc3aOIcFRunkz3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI4;sn=1902828',
  'x-ms-request-id',
  '287aa6dd-61ab-42a3-9401-f9295f385a38',
  'x-ms-correlation-request-id',
  '287aa6dd-61ab-42a3-9401-f9295f385a38',
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
  .put('/kv/setConfigTest158696685504101004', {"key":"setConfigTest158696685504101004","label":"test","value":"foo2"})
  .query(true)
  .reply(200, {"etag":"BIP5tDTq9WHtcC3N1kuybxBlkQn","key":"setConfigTest158696685504101004","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
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
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"BIP5tDTq9WHtcC3N1kuybxBlkQn"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI5;sn=1902829',
  'x-ms-request-id',
  '21803330-9c31-4114-a6af-31d2857c0f04',
  'x-ms-correlation-request-id',
  '21803330-9c31-4114-a6af-31d2857c0f04',
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
  .delete('/kv/setConfigTest158696685504101004')
  .query(true)
  .reply(200, {"etag":"BIP5tDTq9WHtcC3N1kuybxBlkQn","key":"setConfigTest158696685504101004","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
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
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"BIP5tDTq9WHtcC3N1kuybxBlkQn"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODMw;sn=1902830',
  'x-ms-request-id',
  '4e96a200-04a5-44ac-bf9b-88de45fdfd10',
  'x-ms-correlation-request-id',
  '4e96a200-04a5-44ac-bf9b-88de45fdfd10',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
