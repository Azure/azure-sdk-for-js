let nock = require('nock');

module.exports.hash = "a4ca9b251b8b0633e16f9e0e17360a93";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162439657358703686"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162439657358703686', {"key":".appconfig.featureflag/name-1162439657358703686","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World"})
  .query(true)
  .reply(200, {"etag":"xlVgpC7kEWSh6qtFl3qqBKmwG09","key":".appconfig.featureflag/name-1162439657358703686","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:13+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:13 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:13 GMT',
  'ETag',
  '"xlVgpC7kEWSh6qtFl3qqBKmwG09"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc3;sn=3592377',
  'x-ms-request-id',
  'cdf3317e-1160-4dac-ad1a-5c169796f5f6',
  'x-ms-correlation-request-id',
  'cdf3317e-1160-4dac-ad1a-5c169796f5f6',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162439657358703686')
  .query(true)
  .reply(200, {"etag":"xlVgpC7kEWSh6qtFl3qqBKmwG09","key":".appconfig.featureflag/name-1162439657358703686","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:13+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:13 GMT',
  'ETag',
  '"xlVgpC7kEWSh6qtFl3qqBKmwG09"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc3;sn=3592377',
  'x-ms-request-id',
  '4b607f7a-ec53-4da0-a945-763d6f58d269',
  'x-ms-correlation-request-id',
  '4b607f7a-ec53-4da0-a945-763d6f58d269',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439657358703686')
  .query(true)
  .reply(200, {"etag":"xlVgpC7kEWSh6qtFl3qqBKmwG09","key":".appconfig.featureflag/name-1162439657358703686","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:13+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:13 GMT',
  'ETag',
  '"xlVgpC7kEWSh6qtFl3qqBKmwG09"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc4;sn=3592378',
  'x-ms-request-id',
  '4d6dc3d8-50fe-4f0e-a591-54d7782cfd81',
  'x-ms-correlation-request-id',
  '4d6dc3d8-50fe-4f0e-a591-54d7782cfd81',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
