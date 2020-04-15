let nock = require('nock');

module.exports.hash = "16a49a74b18c05a57a50aed98502d08b";

module.exports.testInfo = {"uniqueName":{"setConfigTest":"setConfigTest158690907242906016"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/setConfigTest158690907242906016', {"key":"setConfigTest158690907242906016","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"}})
  .query(true)
  .reply(200, {"etag":"C2D9jYOYv2Tzynimc05KpnzDP6L","key":"setConfigTest158690907242906016","label":"test","content_type":"application/json","value":"foo","tags":{"bar":"baz","car":"caz"},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
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
  '"C2D9jYOYv2Tzynimc05KpnzDP6L"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE2;sn=1897916',
  'x-ms-request-id',
  '3085ad5e-6d41-408c-882b-7301d389dadc',
  'x-ms-correlation-request-id',
  '3085ad5e-6d41-408c-882b-7301d389dadc',
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
  .put('/kv/setConfigTest158690907242906016', {"key":"setConfigTest158690907242906016","label":"test","value":"foo2"})
  .query(true)
  .reply(200, {"etag":"hecHXDUZV9xGMxVZb2g3Zpi36z0","key":"setConfigTest158690907242906016","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
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
  '"hecHXDUZV9xGMxVZb2g3Zpi36z0"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE3;sn=1897917',
  'x-ms-request-id',
  '0c0b1b82-4499-4053-b39f-6718c478a355',
  'x-ms-correlation-request-id',
  '0c0b1b82-4499-4053-b39f-6718c478a355',
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
  .delete('/kv/setConfigTest158690907242906016')
  .query(true)
  .reply(200, {"etag":"hecHXDUZV9xGMxVZb2g3Zpi36z0","key":"setConfigTest158690907242906016","label":"test","content_type":null,"value":"foo2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:33+00:00"}, [
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
  '"hecHXDUZV9xGMxVZb2g3Zpi36z0"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTE4;sn=1897918',
  'x-ms-request-id',
  '1ff6c4b3-2890-44bf-b917-1e0ac138c6b1',
  'x-ms-correlation-request-id',
  '1ff6c4b3-2890-44bf-b917-1e0ac138c6b1',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
