let nock = require('nock');

module.exports.hash = "48992f09095cc77d37b2c67be263c5df";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162163960798506396"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-1162163960798506396', {"key":"name-1162163960798506396","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"[]"})
  .query(true)
  .reply(200, {"etag":"7IGrIfetG0EO7G9dc8jIey3FoDp","key":"name-1162163960798506396","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:47 GMT',
  'ETag',
  '"7IGrIfetG0EO7G9dc8jIey3FoDp"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU3;sn=3336957',
  'x-ms-request-id',
  '2cffc17b-7856-4705-b0e4-e46bc1673ced',
  'x-ms-correlation-request-id',
  '2cffc17b-7856-4705-b0e4-e46bc1673ced',
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
  .get('/kv/name-1162163960798506396')
  .query(true)
  .reply(200, {"etag":"7IGrIfetG0EO7G9dc8jIey3FoDp","key":"name-1162163960798506396","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:47+00:00"}, [
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
  'Fri, 21 May 2021 23:26:47 GMT',
  'ETag',
  '"7IGrIfetG0EO7G9dc8jIey3FoDp"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU3;sn=3336957',
  'x-ms-request-id',
  'a2db4a42-3bde-4c41-8207-76cb616795a3',
  'x-ms-correlation-request-id',
  'a2db4a42-3bde-4c41-8207-76cb616795a3',
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
  .delete('/kv/name-1162163960798506396')
  .query(true)
  .reply(200, {"etag":"7IGrIfetG0EO7G9dc8jIey3FoDp","key":"name-1162163960798506396","label":null,"content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:47+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:47 GMT',
  'ETag',
  '"7IGrIfetG0EO7G9dc8jIey3FoDp"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU4;sn=3336958',
  'x-ms-request-id',
  'c4bbd234-9b12-46ed-a79d-572a1a5d6767',
  'x-ms-correlation-request-id',
  'c4bbd234-9b12-46ed-a79d-572a1a5d6767',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
