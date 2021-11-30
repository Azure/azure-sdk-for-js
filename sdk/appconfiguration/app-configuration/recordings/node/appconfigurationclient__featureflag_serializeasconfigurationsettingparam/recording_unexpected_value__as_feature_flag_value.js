let nock = require('nock');

module.exports.hash = "a4ca9b251b8b0633e16f9e0e17360a93";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162439657273608939"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162439657273608939', {"key":".appconfig.featureflag/name-1162439657273608939","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]"})
  .query(true)
  .reply(200, {"etag":"RF2UjbC36kg0nK1OJjRgF4RgTiA","key":".appconfig.featureflag/name-1162439657273608939","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:12+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:07 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:12 GMT',
  'ETag',
  '"RF2UjbC36kg0nK1OJjRgF4RgTiA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc1;sn=3592375',
  'x-ms-request-id',
  '5c1765b0-353c-463f-b64d-a8718ab61f49',
  'x-ms-correlation-request-id',
  '5c1765b0-353c-463f-b64d-a8718ab61f49',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162439657273608939')
  .query(true)
  .reply(200, {"etag":"RF2UjbC36kg0nK1OJjRgF4RgTiA","key":".appconfig.featureflag/name-1162439657273608939","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:12+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:12 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:12 GMT',
  'ETag',
  '"RF2UjbC36kg0nK1OJjRgF4RgTiA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc1;sn=3592375',
  'x-ms-request-id',
  '7ef6e3fc-b1b0-4933-a357-6ea0c7f63c84',
  'x-ms-correlation-request-id',
  '7ef6e3fc-b1b0-4933-a357-6ea0c7f63c84',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439657273608939')
  .query(true)
  .reply(200, {"etag":"RF2UjbC36kg0nK1OJjRgF4RgTiA","key":".appconfig.featureflag/name-1162439657273608939","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:12+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:07 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:12 GMT',
  'ETag',
  '"RF2UjbC36kg0nK1OJjRgF4RgTiA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc2;sn=3592376',
  'x-ms-request-id',
  'f316036a-02aa-4bec-9959-e38e39838e6b',
  'x-ms-correlation-request-id',
  'f316036a-02aa-4bec-9959-e38e39838e6b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
