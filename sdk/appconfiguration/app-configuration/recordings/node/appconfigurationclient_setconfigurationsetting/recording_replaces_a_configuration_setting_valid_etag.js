let nock = require('nock');

module.exports.hash = "a9647608679e4b879d25018a499998c5";

module.exports.testInfo = {"uniqueName":{"setConfigTestEtag":"setConfigTestEtag158690907275004767"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTestEtag158690907275004767', {"key":"setConfigTestEtag158690907275004767","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"sks0erS0W8gdr65Cz7BcBzoq9NY","key":"setConfigTestEtag158690907275004767","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
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
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"sks0erS0W8gdr65Cz7BcBzoq9NY"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE5;sn=1897919',
  'x-ms-request-id',
  '2d652a65-3950-4d86-a1b6-8b8445ddc96e',
  'x-ms-correlation-request-id',
  '2d652a65-3950-4d86-a1b6-8b8445ddc96e',
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
  .put('/kv/setConfigTestEtag158690907275004767', {"key":"setConfigTestEtag158690907275004767","label":"test","value":"foo2","etag":"sks0erS0W8gdr65Cz7BcBzoq9NY"})
  .query(true)
  .reply(200, {"etag":"MXKvgd63h0dQtK0sBY81sehj9KI","key":"setConfigTestEtag158690907275004767","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
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
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"MXKvgd63h0dQtK0sBY81sehj9KI"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTIw;sn=1897920',
  'x-ms-request-id',
  '1ccb47ad-7ddc-4c94-9575-c7d858e16b1d',
  'x-ms-correlation-request-id',
  '1ccb47ad-7ddc-4c94-9575-c7d858e16b1d',
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
  .delete('/kv/setConfigTestEtag158690907275004767')
  .query(true)
  .reply(200, {"etag":"MXKvgd63h0dQtK0sBY81sehj9KI","key":"setConfigTestEtag158690907275004767","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:33 GMT',
  'ETag',
  '"MXKvgd63h0dQtK0sBY81sehj9KI"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTIx;sn=1897921',
  'x-ms-request-id',
  '1c6bb9b3-40f2-4af2-ba91-35f3d5581616',
  'x-ms-correlation-request-id',
  '1c6bb9b3-40f2-4af2-ba91-35f3d5581616',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
