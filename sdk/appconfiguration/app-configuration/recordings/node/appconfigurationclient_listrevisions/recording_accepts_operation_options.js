let nock = require('nock');

module.exports.hash = "6fb2405b3c4be6bdce29961335ace203";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696685197506184","list-revisions-A":"list-revisions-A158696685197507820","list-revisions-B":"list-revisions-B158696685197508436"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696685197506184', {"key":"listRevisions158696685197506184","label":"list-revisions-A158696685197507820","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"DYTSQ0gWtO1472nUBD5qMKmg4ve","key":"listRevisions158696685197506184","label":"list-revisions-A158696685197507820","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:32 GMT',
  'ETag',
  '"DYTSQ0gWtO1472nUBD5qMKmg4ve"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODIw;sn=1902820',
  'x-ms-request-id',
  '14078b2d-2f66-4e39-abf1-189e663aa774',
  'x-ms-correlation-request-id',
  '14078b2d-2f66-4e39-abf1-189e663aa774',
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
  .put('/kv/listRevisions158696685197506184', {"key":"listRevisions158696685197506184","label":"list-revisions-A158696685197507820","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"lPRVwTtFRmxwLnZitawwvOv78eE","key":"listRevisions158696685197506184","label":"list-revisions-A158696685197507820","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'ETag',
  '"lPRVwTtFRmxwLnZitawwvOv78eE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODIx;sn=1902821',
  'x-ms-request-id',
  '61e3fdfd-5921-4613-9b86-31bfdaf990b3',
  'x-ms-correlation-request-id',
  '61e3fdfd-5921-4613-9b86-31bfdaf990b3',
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
  .put('/kv/listRevisions158696685197506184', {"key":"listRevisions158696685197506184","label":"list-revisions-B158696685197508436","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"UwBptruLJJzJxYBX0zXn6BsdICV","key":"listRevisions158696685197506184","label":"list-revisions-B158696685197508436","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'ETag',
  '"UwBptruLJJzJxYBX0zXn6BsdICV"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODIy;sn=1902822',
  'x-ms-request-id',
  'e7a4f440-2c2f-4ba5-9bb8-364b3922441c',
  'x-ms-correlation-request-id',
  'e7a4f440-2c2f-4ba5-9bb8-364b3922441c',
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
  .put('/kv/listRevisions158696685197506184', {"key":"listRevisions158696685197506184","label":"list-revisions-B158696685197508436","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"z8yXAURITmsKNumRWha6m2EMXJy","key":"listRevisions158696685197506184","label":"list-revisions-B158696685197508436","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'ETag',
  '"z8yXAURITmsKNumRWha6m2EMXJy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODIz;sn=1902823',
  'x-ms-request-id',
  '41052ec7-732e-4e44-b40e-55b84de6ac7b',
  'x-ms-correlation-request-id',
  '41052ec7-732e-4e44-b40e-55b84de6ac7b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
