let nock = require('nock');

module.exports.hash = "5488b0a78bc36e79038fb3ef4081a15d";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162163960595608239"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162163960595608239', {"key":".appconfig.featureflag/name-1162163960595608239","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]"})
  .query(true)
  .reply(200, {"etag":"NqiUYlqAKxSal24DPF7foIYCWEJ","key":".appconfig.featureflag/name-1162163960595608239","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:45+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:45 GMT',
  'ETag',
  '"NqiUYlqAKxSal24DPF7foIYCWEJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTUz;sn=3336953',
  'x-ms-request-id',
  '21e4fac6-6fd0-4733-9797-eb171d0e5af1',
  'x-ms-correlation-request-id',
  '21e4fac6-6fd0-4733-9797-eb171d0e5af1',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162163960595608239')
  .query(true)
  .reply(200, {"etag":"NqiUYlqAKxSal24DPF7foIYCWEJ","key":".appconfig.featureflag/name-1162163960595608239","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:45+00:00"}, [
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
  'Fri, 21 May 2021 23:26:45 GMT',
  'ETag',
  '"NqiUYlqAKxSal24DPF7foIYCWEJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTUz;sn=3336953',
  'x-ms-request-id',
  '0ea753e1-3bef-4ada-8bff-9addbae6733d',
  'x-ms-correlation-request-id',
  '0ea753e1-3bef-4ada-8bff-9addbae6733d',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162163960595608239')
  .query(true)
  .reply(200, {"etag":"NqiUYlqAKxSal24DPF7foIYCWEJ","key":".appconfig.featureflag/name-1162163960595608239","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"[]","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:45+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 21 May 2021 23:26:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 21 May 2021 23:26:45 GMT',
  'ETag',
  '"NqiUYlqAKxSal24DPF7foIYCWEJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU0;sn=3336954',
  'x-ms-request-id',
  '3fc20067-cb5f-43f3-aee3-fe048a3af438',
  'x-ms-correlation-request-id',
  '3fc20067-cb5f-43f3-aee3-fe048a3af438',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
