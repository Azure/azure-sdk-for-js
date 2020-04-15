let nock = require('nock');

module.exports.hash = "49df23b7338f070e6ab730c33f2fce58";

module.exports.testInfo = {"uniqueName":{"deleteConfigTest":"deleteConfigTest158690902651805362"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/deleteConfigTest158690902651805362', {"key":"deleteConfigTest158690902651805362","label":"MyLabel","value":"MyValue"})
  .query(true)
  .reply(200, {"etag":"71vMQ3QJDfLOOUATTQWRrWL6noS","key":"deleteConfigTest158690902651805362","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'ETag',
  '"71vMQ3QJDfLOOUATTQWRrWL6noS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDMw;sn=1897430',
  'x-ms-request-id',
  '89e89c77-766d-4cda-9ddf-0688b73ad583',
  'x-ms-correlation-request-id',
  '89e89c77-766d-4cda-9ddf-0688b73ad583',
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
  .delete('/kv/deleteConfigTest158690902651805362')
  .query(true)
  .reply(200, {"etag":"71vMQ3QJDfLOOUATTQWRrWL6noS","key":"deleteConfigTest158690902651805362","label":"MyLabel","content_type":null,"value":"MyValue","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:47 GMT',
  'ETag',
  '"71vMQ3QJDfLOOUATTQWRrWL6noS"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDMx;sn=1897431',
  'x-ms-request-id',
  '8d38d38a-66a9-4b1b-9119-f15eb63e2cc2',
  'x-ms-correlation-request-id',
  '8d38d38a-66a9-4b1b-9119-f15eb63e2cc2',
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
  .get('/kv/deleteConfigTest158690902651805362')
  .query(true)
  .reply(404, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '90b01825-abbb-4e39-9ec1-ccf13aace6c2',
  'x-ms-correlation-request-id',
  '90b01825-abbb-4e39-9ec1-ccf13aace6c2',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
