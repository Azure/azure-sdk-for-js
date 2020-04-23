let nock = require('nock');

module.exports.hash = "e50952e4306dbfa7cb44b0336fe7eca9";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189359101119"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189359101119', {"key":"etags158700189359101119","value":"some value"})
  .query(true)
  .reply(200, {"etag":"epp9RfOZ8RMTEjMjM0meMM1zBIW","key":"etags158700189359101119","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'ETag',
  '"epp9RfOZ8RMTEjMjM0meMM1zBIW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEw;sn=1904810',
  'x-ms-request-id',
  'c143183f-c06c-4004-8c4b-2d97da6eef01',
  'x-ms-correlation-request-id',
  'c143183f-c06c-4004-8c4b-2d97da6eef01',
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
  .get('/kv/etags158700189359101119')
  .query(true)
  .reply(200, {"etag":"epp9RfOZ8RMTEjMjM0meMM1zBIW","key":"etags158700189359101119","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'ETag',
  '"epp9RfOZ8RMTEjMjM0meMM1zBIW"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEw;sn=1904810',
  'x-ms-request-id',
  '448abb48-a54e-45bc-a760-4c6123653872',
  'x-ms-correlation-request-id',
  '448abb48-a54e-45bc-a760-4c6123653872',
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
  .put('/kv/etags158700189359101119', {"key":"etags158700189359101119","label":null,"content_type":null,"value":"sneaky user updated the field","last_modified":"2020-04-16T01:51:34.000Z","tags":{},"etag":"epp9RfOZ8RMTEjMjM0meMM1zBIW"})
  .query(true)
  .reply(200, {"etag":"EVLszuwYszYmZBnkI8F0aQm37Qp","key":"etags158700189359101119","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'ETag',
  '"EVLszuwYszYmZBnkI8F0aQm37Qp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEx;sn=1904811',
  'x-ms-request-id',
  '6d4e0ae9-5d36-4f33-abec-8df341c9e086',
  'x-ms-correlation-request-id',
  '6d4e0ae9-5d36-4f33-abec-8df341c9e086',
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
  .put('/kv/etags158700189359101119', {"key":"etags158700189359101119","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-16T01:51:34.000Z","tags":{},"etag":"epp9RfOZ8RMTEjMjM0meMM1zBIW"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '29b2aae5-87a1-46bc-a12d-0e53ce4ccb06',
  'x-ms-correlation-request-id',
  '29b2aae5-87a1-46bc-a12d-0e53ce4ccb06',
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
  .reply(200, {"items":[{"etag":"EVLszuwYszYmZBnkI8F0aQm37Qp","key":"etags158700189359101119","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEx;sn=1904811',
  'x-ms-request-id',
  'eafe93b1-575d-4a69-a955-edee09dcec5f',
  'x-ms-correlation-request-id',
  'eafe93b1-575d-4a69-a955-edee09dcec5f',
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
  .delete('/kv/etags158700189359101119')
  .query(true)
  .reply(200, {"etag":"EVLszuwYszYmZBnkI8F0aQm37Qp","key":"etags158700189359101119","label":null,"content_type":null,"value":"sneaky user updated the field","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'ETag',
  '"EVLszuwYszYmZBnkI8F0aQm37Qp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEy;sn=1904812',
  'x-ms-request-id',
  '015f51be-e7d8-473a-a127-2cbb83eedc13',
  'x-ms-correlation-request-id',
  '015f51be-e7d8-473a-a127-2cbb83eedc13',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
