let nock = require('nock');

module.exports.hash = "5488b0a78bc36e79038fb3ef4081a15d";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162163960704305092"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162163960704305092', {"key":".appconfig.featureflag/name-1162163960704305092","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World"})
  .query(true)
  .reply(200, {"etag":"TUCsSpczvtslRMRZaZWzyKNRxXD","key":".appconfig.featureflag/name-1162163960704305092","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:46+00:00"}, [
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
  'Fri, 21 May 2021 23:26:46 GMT',
  'ETag',
  '"TUCsSpczvtslRMRZaZWzyKNRxXD"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU1;sn=3336955',
  'x-ms-request-id',
  'd2dfac97-c176-4c65-a368-0f8db4d07ae4',
  'x-ms-correlation-request-id',
  'd2dfac97-c176-4c65-a368-0f8db4d07ae4',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162163960704305092')
  .query(true)
  .reply(200, {"etag":"TUCsSpczvtslRMRZaZWzyKNRxXD","key":".appconfig.featureflag/name-1162163960704305092","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:46+00:00"}, [
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
  'Fri, 21 May 2021 23:26:46 GMT',
  'ETag',
  '"TUCsSpczvtslRMRZaZWzyKNRxXD"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU1;sn=3336955',
  'x-ms-request-id',
  'f356bd8d-0e7f-4fd3-9f75-f71b08295337',
  'x-ms-correlation-request-id',
  'f356bd8d-0e7f-4fd3-9f75-f71b08295337',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162163960704305092')
  .query(true)
  .reply(200, {"etag":"TUCsSpczvtslRMRZaZWzyKNRxXD","key":".appconfig.featureflag/name-1162163960704305092","label":null,"content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"Hello World","tags":{},"locked":false,"last_modified":"2021-05-21T23:26:46+00:00"}, [
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
  'Fri, 21 May 2021 23:26:46 GMT',
  'ETag',
  '"TUCsSpczvtslRMRZaZWzyKNRxXD"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMzM2OTU2;sn=3336956',
  'x-ms-request-id',
  '10ebc611-c1f1-4458-b594-a319fbbaa45b',
  'x-ms-correlation-request-id',
  '10ebc611-c1f1-4458-b594-a319fbbaa45b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
