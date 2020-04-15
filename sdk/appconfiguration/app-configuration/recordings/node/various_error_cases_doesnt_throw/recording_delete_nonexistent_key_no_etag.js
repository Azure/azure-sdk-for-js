let nock = require('nock');

module.exports.hash = "65120c9396153f341228a1f66b3ae218";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696685886706486"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696685886706486', {"key":"etags158696685886706486","value":"world"})
  .query(true)
  .reply(200, {"etag":"Zeu8sCDU1DhSOGdGzUbmEVmQ3R3","key":"etags158696685886706486","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:39 GMT',
  'ETag',
  '"Zeu8sCDU1DhSOGdGzUbmEVmQ3R3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODUx;sn=1902851',
  'x-ms-request-id',
  '5f4918c4-328d-4160-b36f-5975ca67324e',
  'x-ms-correlation-request-id',
  '5f4918c4-328d-4160-b36f-5975ca67324e',
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
  .delete('/kv/bogus%20key%20etags158696685886706486')
  .query(true)
  .reply(204, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '92daec3b-1dd1-4c34-aae4-c6d0df4e71cc',
  'x-ms-correlation-request-id',
  '92daec3b-1dd1-4c34-aae4-c6d0df4e71cc',
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
  .reply(200, {"items":[{"etag":"Zeu8sCDU1DhSOGdGzUbmEVmQ3R3","key":"etags158696685886706486","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:39+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODUx;sn=1902851',
  'x-ms-request-id',
  '9db1c060-81eb-4943-9230-703eb88dad4d',
  'x-ms-correlation-request-id',
  '9db1c060-81eb-4943-9230-703eb88dad4d',
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
  .delete('/kv/etags158696685886706486')
  .query(true)
  .reply(200, {"etag":"Zeu8sCDU1DhSOGdGzUbmEVmQ3R3","key":"etags158696685886706486","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:39+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:39 GMT',
  'ETag',
  '"Zeu8sCDU1DhSOGdGzUbmEVmQ3R3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODUy;sn=1902852',
  'x-ms-request-id',
  '304a395f-560a-488e-91e0-61f7dce05075',
  'x-ms-correlation-request-id',
  '304a395f-560a-488e-91e0-61f7dce05075',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
