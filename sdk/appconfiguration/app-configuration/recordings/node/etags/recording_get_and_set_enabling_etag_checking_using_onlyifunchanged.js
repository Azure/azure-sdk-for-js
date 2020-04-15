let nock = require('nock');

module.exports.hash = "e0c64c969cf459afed031c66dee38c40";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690901912101198"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690901912101198', {"key":"etags158690901912101198","value":"some value"})
  .query(true)
  .reply(200, {"etag":"qrDHlXFEKvXDInrMd8PniRetVXq","key":"etags158690901912101198","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"qrDHlXFEKvXDInrMd8PniRetVXq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk4;sn=1897398',
  'x-ms-request-id',
  'fd1c1f61-b2ff-4d3d-9eb0-7e82165bbd40',
  'x-ms-correlation-request-id',
  'fd1c1f61-b2ff-4d3d-9eb0-7e82165bbd40',
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
  .get('/kv/etags158690901912101198')
  .query(true)
  .reply(200, {"etag":"qrDHlXFEKvXDInrMd8PniRetVXq","key":"etags158690901912101198","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"qrDHlXFEKvXDInrMd8PniRetVXq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk4;sn=1897398',
  'x-ms-request-id',
  'c43bb197-c271-404f-8ca0-92d3ee257484',
  'x-ms-correlation-request-id',
  'c43bb197-c271-404f-8ca0-92d3ee257484',
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
  .put('/kv/etags158690901912101198', {"key":"etags158690901912101198","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T00:03:39.000Z","tags":{},"etag":"qrDHlXFEKvXDInrMd8PniRetVXq"})
  .query(true)
  .reply(200, {"etag":"aFNf7DAkiMmJM7olPjuGihABi1O","key":"etags158690901912101198","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"aFNf7DAkiMmJM7olPjuGihABi1O"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk5;sn=1897399',
  'x-ms-request-id',
  '3290cb69-3520-45af-8a17-5de4c5066a90',
  'x-ms-correlation-request-id',
  '3290cb69-3520-45af-8a17-5de4c5066a90',
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
  .put('/kv/etags158690901912101198', {"key":"etags158690901912101198","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T00:03:39.000Z","tags":{},"etag":"bogus"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'bb4993b5-3735-49a7-b65a-45f1cfacdc5a',
  'x-ms-correlation-request-id',
  'bb4993b5-3735-49a7-b65a-45f1cfacdc5a',
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
  .reply(200, {"items":[{"etag":"aFNf7DAkiMmJM7olPjuGihABi1O","key":"etags158690901912101198","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3Mzk5;sn=1897399',
  'x-ms-request-id',
  '9fb790b7-a21b-4497-9204-afbe40b6328b',
  'x-ms-correlation-request-id',
  '9fb790b7-a21b-4497-9204-afbe40b6328b',
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
  .delete('/kv/etags158690901912101198')
  .query(true)
  .reply(200, {"etag":"aFNf7DAkiMmJM7olPjuGihABi1O","key":"etags158690901912101198","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:39 GMT',
  'ETag',
  '"aFNf7DAkiMmJM7olPjuGihABi1O"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAw;sn=1897400',
  'x-ms-request-id',
  '7f3ae2d7-1f7d-4e7c-a926-a93b278a7c35',
  'x-ms-correlation-request-id',
  '7f3ae2d7-1f7d-4e7c-a926-a93b278a7c35',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
