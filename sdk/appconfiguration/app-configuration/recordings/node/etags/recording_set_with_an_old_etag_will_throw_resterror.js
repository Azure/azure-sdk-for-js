let nock = require('nock');

module.exports.hash = "05689a19bc83c96b578d4a08a811d84b";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690901985203102"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690901985203102', {"key":"etags158690901985203102","value":"some value"})
  .query(true)
  .reply(200, {"etag":"pvmaXHNCDQr92XLiq1ZxaXULJ0G","key":"etags158690901985203102","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:40+00:00"}, [
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
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'ETag',
  '"pvmaXHNCDQr92XLiq1ZxaXULJ0G"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAx;sn=1897401',
  'x-ms-request-id',
  '4ef49213-8882-484d-b3fe-cc55eceebd6d',
  'x-ms-correlation-request-id',
  '4ef49213-8882-484d-b3fe-cc55eceebd6d',
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
  .get('/kv/etags158690901985203102')
  .query(true)
  .reply(200, {"etag":"pvmaXHNCDQr92XLiq1ZxaXULJ0G","key":"etags158690901985203102","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'ETag',
  '"pvmaXHNCDQr92XLiq1ZxaXULJ0G"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAx;sn=1897401',
  'x-ms-request-id',
  '884c2042-9f4d-4fbe-9496-fd7a3055b93f',
  'x-ms-correlation-request-id',
  '884c2042-9f4d-4fbe-9496-fd7a3055b93f',
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
  .put('/kv/etags158690901985203102', {"key":"etags158690901985203102","label":null,"content_type":null,"value":"sneaky user updated the field","last_modified":"2020-04-15T00:03:40.000Z","tags":{},"etag":"pvmaXHNCDQr92XLiq1ZxaXULJ0G"})
  .query(true)
  .reply(200, {"etag":"cyfTZgayNGRwq7ZlhkAo8xgfWCl","key":"etags158690901985203102","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'ETag',
  '"cyfTZgayNGRwq7ZlhkAo8xgfWCl"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAy;sn=1897402',
  'x-ms-request-id',
  '0433d466-4b98-49f2-9e8b-d87ff0b503d4',
  'x-ms-correlation-request-id',
  '0433d466-4b98-49f2-9e8b-d87ff0b503d4',
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
  .put('/kv/etags158690901985203102', {"key":"etags158690901985203102","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T00:03:40.000Z","tags":{},"etag":"pvmaXHNCDQr92XLiq1ZxaXULJ0G"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '164539c6-95ce-40d3-a3a3-de31dd7663b9',
  'x-ms-correlation-request-id',
  '164539c6-95ce-40d3-a3a3-de31dd7663b9',
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
  .reply(200, {"items":[{"etag":"cyfTZgayNGRwq7ZlhkAo8xgfWCl","key":"etags158690901985203102","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:40+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAy;sn=1897402',
  'x-ms-request-id',
  'db4f69f1-1100-45b2-a3df-94e5b733670a',
  'x-ms-correlation-request-id',
  'db4f69f1-1100-45b2-a3df-94e5b733670a',
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
  .delete('/kv/etags158690901985203102')
  .query(true)
  .reply(200, {"etag":"cyfTZgayNGRwq7ZlhkAo8xgfWCl","key":"etags158690901985203102","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:40+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'ETag',
  '"cyfTZgayNGRwq7ZlhkAo8xgfWCl"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDAz;sn=1897403',
  'x-ms-request-id',
  '782ae9ff-8232-48c3-9d85-f6c86e56c28b',
  'x-ms-correlation-request-id',
  '782ae9ff-8232-48c3-9d85-f6c86e56c28b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
