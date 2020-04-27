let nock = require('nock');

module.exports.hash = "7e475ba4e1cbdd60ecbbcd0a84eb2322";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696684692408270","list-revisions-A":"list-revisions-A158696684692407609","list-revisions-B":"list-revisions-B158696684692403907"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696684692408270', {"key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"H3PJQBtX6d3iuuXd0z0SyDfrAVh","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:27+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:27 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:27 GMT',
  'ETag',
  '"H3PJQBtX6d3iuuXd0z0SyDfrAVh"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA4;sn=1902808',
  'x-ms-request-id',
  'fa70bbdc-4812-4928-8a82-537b21972c27',
  'x-ms-correlation-request-id',
  'fa70bbdc-4812-4928-8a82-537b21972c27',
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
  .put('/kv/listRevisions158696684692408270', {"key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"7WOtuBScTXWQnWSwazxrufJepws","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:28+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'ETag',
  '"7WOtuBScTXWQnWSwazxrufJepws"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODA5;sn=1902809',
  'x-ms-request-id',
  'a901a919-5c6b-42d6-86e4-af05899bab8d',
  'x-ms-correlation-request-id',
  'a901a919-5c6b-42d6-86e4-af05899bab8d',
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
  .put('/kv/listRevisions158696684692408270', {"key":"listRevisions158696684692408270","label":"list-revisions-B158696684692403907","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"g9LSiQ9rYfczik6lP00xIh2SREQ","key":"listRevisions158696684692408270","label":"list-revisions-B158696684692403907","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:28+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'ETag',
  '"g9LSiQ9rYfczik6lP00xIh2SREQ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEw;sn=1902810',
  'x-ms-request-id',
  '8c1a5801-15b2-4438-9f32-2bcf40f25b3a',
  'x-ms-correlation-request-id',
  '8c1a5801-15b2-4438-9f32-2bcf40f25b3a',
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
  .put('/kv/listRevisions158696684692408270', {"key":"listRevisions158696684692408270","label":"list-revisions-B158696684692403907","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"dQJG25vNB1o9mAUw1ABIxy9iRJR","key":"listRevisions158696684692408270","label":"list-revisions-B158696684692403907","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:28+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'ETag',
  '"dQJG25vNB1o9mAUw1ABIxy9iRJR"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEx;sn=1902811',
  'x-ms-request-id',
  '5b21f23e-4488-4625-8008-4f618f57380c',
  'x-ms-correlation-request-id',
  '5b21f23e-4488-4625-8008-4f618f57380c',
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
  .reply(200, {"items":[{"etag":"7WOtuBScTXWQnWSwazxrufJepws","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:28+00:00"},{"etag":"H3PJQBtX6d3iuuXd0z0SyDfrAVh","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:27+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEx;sn=1902811',
  'x-ms-request-id',
  'd815197e-4f91-4e7d-bc46-2c500b86b85a',
  'x-ms-correlation-request-id',
  'd815197e-4f91-4e7d-bc46-2c500b86b85a',
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
  .reply(200, {"items":[{"etag":"7WOtuBScTXWQnWSwazxrufJepws","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:28+00:00"},{"etag":"H3PJQBtX6d3iuuXd0z0SyDfrAVh","key":"listRevisions158696684692408270","label":"list-revisions-A158696684692407609","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:27+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:28 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODEx;sn=1902811',
  'x-ms-request-id',
  '66437bbc-6a32-42ff-a17a-96d394aec588',
  'x-ms-correlation-request-id',
  '66437bbc-6a32-42ff-a17a-96d394aec588',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
