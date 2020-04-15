let nock = require('nock');

module.exports.hash = "b7d85c7431f5105597e8cb8cd14c0cb4";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690907083304562","list-revisions-A":"list-revisions-A158690907083305269","list-revisions-B":"list-revisions-B158690907083306397"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690907083304562', {"key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"reKOqiNtnXhrviysZPvm29lsdwX","key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:30 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'ETag',
  '"reKOqiNtnXhrviysZPvm29lsdwX"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTEy;sn=1897912',
  'x-ms-request-id',
  '8e49b6e1-d494-4902-b3f2-08b3548dfbf2',
  'x-ms-correlation-request-id',
  '8e49b6e1-d494-4902-b3f2-08b3548dfbf2',
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
  .put('/kv/listRevisions158690907083304562', {"key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"OG3SRcXTmZGrpUtPd0kXocwJpln","key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'ETag',
  '"OG3SRcXTmZGrpUtPd0kXocwJpln"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTEz;sn=1897913',
  'x-ms-request-id',
  '20f59cdf-bbc6-48d7-a1de-4dec4ed671cf',
  'x-ms-correlation-request-id',
  '20f59cdf-bbc6-48d7-a1de-4dec4ed671cf',
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
  .put('/kv/listRevisions158690907083304562', {"key":"listRevisions158690907083304562","label":"list-revisions-B158690907083306397","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"Yq8b5iKPP1et0XA59vlaMDlCjqV","key":"listRevisions158690907083304562","label":"list-revisions-B158690907083306397","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'ETag',
  '"Yq8b5iKPP1et0XA59vlaMDlCjqV"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE0;sn=1897914',
  'x-ms-request-id',
  '09e68ffd-9c2e-43a2-8369-d9ff47695485',
  'x-ms-correlation-request-id',
  '09e68ffd-9c2e-43a2-8369-d9ff47695485',
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
  .put('/kv/listRevisions158690907083304562', {"key":"listRevisions158690907083304562","label":"list-revisions-B158690907083306397","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"BKZYrQv2pHvAD9xAnw1d44aTkE9","key":"listRevisions158690907083304562","label":"list-revisions-B158690907083306397","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'ETag',
  '"BKZYrQv2pHvAD9xAnw1d44aTkE9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE1;sn=1897915',
  'x-ms-request-id',
  'b5d12a58-a7cc-47a3-9670-0ba314b04ebd',
  'x-ms-correlation-request-id',
  'b5d12a58-a7cc-47a3-9670-0ba314b04ebd',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"reKOqiNtnXhrviysZPvm29lsdwX","key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'Link',
  '</revisions?key=listRevisions158690907083304562&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE1;sn=1897915',
  'x-ms-request-id',
  'eb9eb2ce-b616-4684-8a7e-3f0e29d46146',
  'x-ms-correlation-request-id',
  'eb9eb2ce-b616-4684-8a7e-3f0e29d46146',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"reKOqiNtnXhrviysZPvm29lsdwX","key":"listRevisions158690907083304562","label":"list-revisions-A158690907083305269","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:31+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 00:04:31 GMT',
  'Link',
  '</revisions?key=listRevisions158690907083304562&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE1;sn=1897915',
  'x-ms-request-id',
  '58e7647f-90cb-4f11-925b-8e2d04d7b6ca',
  'x-ms-correlation-request-id',
  '58e7647f-90cb-4f11-925b-8e2d04d7b6ca',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
