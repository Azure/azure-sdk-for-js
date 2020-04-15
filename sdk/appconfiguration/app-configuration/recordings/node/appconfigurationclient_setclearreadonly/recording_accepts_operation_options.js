let nock = require('nock');

module.exports.hash = "c9b6eb132d2cfb70d44e21d11b90d126";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158690902447606042"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158690902447606042', {"key":"readOnlyTests158690902447606042","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"DL6wiThK0FFrjZDkZOnCbjekevz","key":"readOnlyTests158690902447606042","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"DL6wiThK0FFrjZDkZOnCbjekevz"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE4;sn=1897418',
  'x-ms-request-id',
  '7d5751f9-8e32-49a3-b1bc-9055e802207d',
  'x-ms-correlation-request-id',
  '7d5751f9-8e32-49a3-b1bc-9055e802207d',
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
  .get('/kv/readOnlyTests158690902447606042')
  .query(true)
  .reply(200, {"etag":"DL6wiThK0FFrjZDkZOnCbjekevz","key":"readOnlyTests158690902447606042","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"DL6wiThK0FFrjZDkZOnCbjekevz"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE4;sn=1897418',
  'x-ms-request-id',
  '29a00560-1c49-4936-be31-f0d1bbf4b271',
  'x-ms-correlation-request-id',
  '29a00560-1c49-4936-be31-f0d1bbf4b271',
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
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"DL6wiThK0FFrjZDkZOnCbjekevz","key":"readOnlyTests158690902447606042","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE4;sn=1897418',
  'x-ms-request-id',
  '1df996e0-733c-44ff-93ae-72f036ac5abc',
  'x-ms-correlation-request-id',
  '1df996e0-733c-44ff-93ae-72f036ac5abc',
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
  .delete('/kv/readOnlyTests158690902447606042')
  .query(true)
  .reply(200, {"etag":"DL6wiThK0FFrjZDkZOnCbjekevz","key":"readOnlyTests158690902447606042","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"DL6wiThK0FFrjZDkZOnCbjekevz"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDE5;sn=1897419',
  'x-ms-request-id',
  'aa12b298-8d45-45f8-8949-e85cea8df0c5',
  'x-ms-correlation-request-id',
  'aa12b298-8d45-45f8-8949-e85cea8df0c5',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
