let nock = require('nock');

module.exports.hash = "bd72d2e29fc24afb3fb459208cc4ebce";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690906435709177","list-revisions-A":"list-revisions-A158690906435706678","list-revisions-B":"list-revisions-B158690906435704739"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690906435709177', {"key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"P4uSr2gLWqL5RBbDmQ4TLzGMZWG","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:24 GMT',
  'ETag',
  '"P4uSr2gLWqL5RBbDmQ4TLzGMZWG"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk2;sn=1897896',
  'x-ms-request-id',
  '915234aa-ad50-43b0-bb12-2e0d345191f5',
  'x-ms-correlation-request-id',
  '915234aa-ad50-43b0-bb12-2e0d345191f5',
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
  .put('/kv/listRevisions158690906435709177', {"key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"QFXfbcdUvB2SswtlzSrTZgWFjdy","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:25 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'ETag',
  '"QFXfbcdUvB2SswtlzSrTZgWFjdy"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk3;sn=1897897',
  'x-ms-request-id',
  'bcf76865-f149-4058-ab65-e86796f5b595',
  'x-ms-correlation-request-id',
  'bcf76865-f149-4058-ab65-e86796f5b595',
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
  .put('/kv/listRevisions158690906435709177', {"key":"listRevisions158690906435709177","label":"list-revisions-B158690906435704739","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"lAWEhfwdZY0NZoVRayKTUwDDpjf","key":"listRevisions158690906435709177","label":"list-revisions-B158690906435704739","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:25 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'ETag',
  '"lAWEhfwdZY0NZoVRayKTUwDDpjf"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk4;sn=1897898',
  'x-ms-request-id',
  '4a0d4446-2949-4b93-8e2f-a34a83fc8b98',
  'x-ms-correlation-request-id',
  '4a0d4446-2949-4b93-8e2f-a34a83fc8b98',
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
  .put('/kv/listRevisions158690906435709177', {"key":"listRevisions158690906435709177","label":"list-revisions-B158690906435704739","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"OXoAj6D5X5Nu2KW3rfhzlsY5VLE","key":"listRevisions158690906435709177","label":"list-revisions-B158690906435704739","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:25 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'ETag',
  '"OXoAj6D5X5Nu2KW3rfhzlsY5VLE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk5;sn=1897899',
  'x-ms-request-id',
  '231ce805-fc59-46cf-b221-2528b8733e78',
  'x-ms-correlation-request-id',
  '231ce805-fc59-46cf-b221-2528b8733e78',
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
  .reply(200, {"items":[{"etag":"QFXfbcdUvB2SswtlzSrTZgWFjdy","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"},{"etag":"P4uSr2gLWqL5RBbDmQ4TLzGMZWG","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:25 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk5;sn=1897899',
  'x-ms-request-id',
  '5271fb9e-ecbb-408f-b62f-c45537045716',
  'x-ms-correlation-request-id',
  '5271fb9e-ecbb-408f-b62f-c45537045716',
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
  .reply(200, {"items":[{"etag":"QFXfbcdUvB2SswtlzSrTZgWFjdy","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:26+00:00"},{"etag":"P4uSr2gLWqL5RBbDmQ4TLzGMZWG","key":"listRevisions158690906435709177","label":"list-revisions-A158690906435706678","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:26 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk5;sn=1897899',
  'x-ms-request-id',
  '50956206-83ce-4996-a1b2-8872e18e71f3',
  'x-ms-correlation-request-id',
  '50956206-83ce-4996-a1b2-8872e18e71f3',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
