let nock = require('nock');

module.exports.hash = "8e6cada11b40475427e97700fd3dcdcb";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690906769906386","list-revisions-A":"list-revisions-A158690906769909718","list-revisions-B":"list-revisions-B158690906769905561"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690906769906386', {"key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"6M9NIJGwE5SbsqjWGwE2P0fePyO","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:28+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:28 GMT',
  'ETag',
  '"6M9NIJGwE5SbsqjWGwE2P0fePyO"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA0;sn=1897904',
  'x-ms-request-id',
  'e8d44d66-d3ba-426d-9325-00ed9cfddcfe',
  'x-ms-correlation-request-id',
  'e8d44d66-d3ba-426d-9325-00ed9cfddcfe',
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
  .put('/kv/listRevisions158690906769906386', {"key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"za5XZQGGLKkMHRC8uU6EdStwMm3","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'ETag',
  '"za5XZQGGLKkMHRC8uU6EdStwMm3"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA1;sn=1897905',
  'x-ms-request-id',
  '47a64074-56af-4b03-8a44-79d19b21b08d',
  'x-ms-correlation-request-id',
  '47a64074-56af-4b03-8a44-79d19b21b08d',
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
  .put('/kv/listRevisions158690906769906386', {"key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"YapGxmsaTqry3rmHpsnYC7Ere4d","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'ETag',
  '"YapGxmsaTqry3rmHpsnYC7Ere4d"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA2;sn=1897906',
  'x-ms-request-id',
  '96ec9311-2ba0-4ca5-ab17-28fdbd85a535',
  'x-ms-correlation-request-id',
  '96ec9311-2ba0-4ca5-ab17-28fdbd85a535',
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
  .put('/kv/listRevisions158690906769906386', {"key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"zCyJUIFZaws2Rsb2LcQjmZaSJk0","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'ETag',
  '"zCyJUIFZaws2Rsb2LcQjmZaSJk0"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA3;sn=1897907',
  'x-ms-request-id',
  'c47655bc-0c8e-45f1-ae14-66a3c336fb8b',
  'x-ms-correlation-request-id',
  'c47655bc-0c8e-45f1-ae14-66a3c336fb8b',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"zCyJUIFZaws2Rsb2LcQjmZaSJk0","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"YapGxmsaTqry3rmHpsnYC7Ere4d","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"za5XZQGGLKkMHRC8uU6EdStwMm3","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"6M9NIJGwE5SbsqjWGwE2P0fePyO","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:28+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA3;sn=1897907',
  'x-ms-request-id',
  'd5d6ac3a-9a71-4492-ad15-a2a015952e81',
  'x-ms-correlation-request-id',
  'd5d6ac3a-9a71-4492-ad15-a2a015952e81',
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
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"zCyJUIFZaws2Rsb2LcQjmZaSJk0","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"YapGxmsaTqry3rmHpsnYC7Ere4d","key":"listRevisions158690906769906386","label":"list-revisions-B158690906769905561","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"za5XZQGGLKkMHRC8uU6EdStwMm3","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:29+00:00"},{"etag":"6M9NIJGwE5SbsqjWGwE2P0fePyO","key":"listRevisions158690906769906386","label":"list-revisions-A158690906769909718","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:28+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:29 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTA3;sn=1897907',
  'x-ms-request-id',
  '67361469-aa4f-4516-93e5-6c90708723a4',
  'x-ms-correlation-request-id',
  '67361469-aa4f-4516-93e5-6c90708723a4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
