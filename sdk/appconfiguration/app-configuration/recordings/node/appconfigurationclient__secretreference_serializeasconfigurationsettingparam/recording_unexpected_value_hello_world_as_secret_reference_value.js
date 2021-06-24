let nock = require('nock');

module.exports.hash = "48992f09095cc77d37b2c67be263c5df";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162163960911307058"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-1162163960911307058', {"key":"name-1162163960911307058","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"Hello World"})
  .query(true)
  .reply(200, {"etag":"h3tbb4e2MOVu8CV918q8qq1h5VY","key":"name-1162163960911307058","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:48 GMT',
  'ETag',
  '"h3tbb4e2MOVu8CV918q8qq1h5VY"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU5;sn=3336959',
  'x-ms-request-id',
  '8500968f-297c-4ae9-8c4b-774eefbc577b',
  'x-ms-correlation-request-id',
  '8500968f-297c-4ae9-8c4b-774eefbc577b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/name-1162163960911307058')
  .query(true)
  .reply(200, {"etag":"h3tbb4e2MOVu8CV918q8qq1h5VY","key":"name-1162163960911307058","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:48 GMT',
  'ETag',
  '"h3tbb4e2MOVu8CV918q8qq1h5VY"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU5;sn=3336959',
  'x-ms-request-id',
  '44a2c2a7-8a0d-4319-af58-f6461dbd4c97',
  'x-ms-correlation-request-id',
  '44a2c2a7-8a0d-4319-af58-f6461dbd4c97',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/name-1162163960911307058')
  .query(true)
  .reply(200, {"etag":"h3tbb4e2MOVu8CV918q8qq1h5VY","key":"name-1162163960911307058","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:48+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:48 GMT',
  'ETag',
  '"h3tbb4e2MOVu8CV918q8qq1h5VY"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTYw;sn=3336960',
  'x-ms-request-id',
  'ee4bc992-3def-482b-b896-94797bfb9eb0',
  'x-ms-correlation-request-id',
  'ee4bc992-3def-482b-b896-94797bfb9eb0',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
