let nock = require('nock');

module.exports.hash = "f28d2b46f7597ea1e985388268634f27";

module.exports.testInfo = {"uniqueName":{"setConfigTestEtag":"setConfigTestEtag158696685536206423"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTestEtag158696685536206423', {"key":"setConfigTestEtag158696685536206423","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"n2IL0p2PIrlD3lH7THr7lbVW40g","key":"setConfigTestEtag158696685536206423","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
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
  '"n2IL0p2PIrlD3lH7THr7lbVW40g"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODMx;sn=1902831',
  'x-ms-request-id',
  'd8234b30-ffce-42d9-a08c-b003f32dabfc',
  'x-ms-correlation-request-id',
  'd8234b30-ffce-42d9-a08c-b003f32dabfc',
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
  .put('/kv/setConfigTestEtag158696685536206423', {"key":"setConfigTestEtag158696685536206423","label":"test","value":"foo2","etag":"n2IL0p2PIrlD3lH7THr7lbVW40g"})
  .query(true)
  .reply(200, {"etag":"i2qqev9LzppkVlO8zlkflPxjlXS","key":"setConfigTestEtag158696685536206423","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}, [
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
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'ETag',
  '"i2qqev9LzppkVlO8zlkflPxjlXS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODMy;sn=1902832',
  'x-ms-request-id',
  'af0003ec-0709-4302-abe4-0605ed90b6ee',
  'x-ms-correlation-request-id',
  'af0003ec-0709-4302-abe4-0605ed90b6ee',
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
  .delete('/kv/setConfigTestEtag158696685536206423')
  .query(true)
  .reply(200, {"etag":"i2qqev9LzppkVlO8zlkflPxjlXS","key":"setConfigTestEtag158696685536206423","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:36+00:00"}, [
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
  'Wed, 15 Apr 2020 16:07:36 GMT',
  'ETag',
  '"i2qqev9LzppkVlO8zlkflPxjlXS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODMz;sn=1902833',
  'x-ms-request-id',
  'ea7e77a0-44d9-4ecd-80d3-c5aa2a9efaca',
  'x-ms-correlation-request-id',
  'ea7e77a0-44d9-4ecd-80d3-c5aa2a9efaca',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
