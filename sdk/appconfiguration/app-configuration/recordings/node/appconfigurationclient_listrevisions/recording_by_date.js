let nock = require('nock');

module.exports.hash = "fb681e32d81bb2cb7da34d1e66417329";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158696685341703334","list-revisions-A":"list-revisions-A158696685341706958","list-revisions-B":"list-revisions-B158696685341703899"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158696685341703334', {"key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"zGLH0j7CGstuaGlI1IdamvisT9t","key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}, [
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
  '"zGLH0j7CGstuaGlI1IdamvisT9t"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI0;sn=1902824',
  'x-ms-request-id',
  '20ed1bb8-1a89-425d-98c7-d0806cb671a8',
  'x-ms-correlation-request-id',
  '20ed1bb8-1a89-425d-98c7-d0806cb671a8',
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
  .put('/kv/listRevisions158696685341703334', {"key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"jnA0e6lAIciF4bhTr1eQKNutYgl","key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"jnA0e6lAIciF4bhTr1eQKNutYgl"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI1;sn=1902825',
  'x-ms-request-id',
  '88e98d19-fa4d-435e-a530-0f971f40a559',
  'x-ms-correlation-request-id',
  '88e98d19-fa4d-435e-a530-0f971f40a559',
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
  .put('/kv/listRevisions158696685341703334', {"key":"listRevisions158696685341703334","label":"list-revisions-B158696685341703899","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"msfnlKKzzwQW1kbJit6XIc9Up9l","key":"listRevisions158696685341703334","label":"list-revisions-B158696685341703899","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"msfnlKKzzwQW1kbJit6XIc9Up9l"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI2;sn=1902826',
  'x-ms-request-id',
  '61141e1c-9144-44f1-a528-fa5d2f588a83',
  'x-ms-correlation-request-id',
  '61141e1c-9144-44f1-a528-fa5d2f588a83',
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
  .put('/kv/listRevisions158696685341703334', {"key":"listRevisions158696685341703334","label":"list-revisions-B158696685341703899","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"zdFqwtnrcwvY6IRmEJADeJxAZ2Q","key":"listRevisions158696685341703334","label":"list-revisions-B158696685341703899","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'ETag',
  '"zdFqwtnrcwvY6IRmEJADeJxAZ2Q"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI3;sn=1902827',
  'x-ms-request-id',
  'f89779c0-0b1d-462e-97db-efca84d698ac',
  'x-ms-correlation-request-id',
  'f89779c0-0b1d-462e-97db-efca84d698ac',
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
  .reply(200, {"items":[{"etag":"zGLH0j7CGstuaGlI1IdamvisT9t","key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'Link',
  '</revisions?key=listRevisions158696685341703334&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI3;sn=1902827',
  'x-ms-request-id',
  '90a6bacf-8f36-45b7-95f9-75d389daf471',
  'x-ms-correlation-request-id',
  '90a6bacf-8f36-45b7-95f9-75d389daf471',
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
  .reply(200, {"items":[{"etag":"zGLH0j7CGstuaGlI1IdamvisT9t","key":"listRevisions158696685341703334","label":"list-revisions-A158696685341706958","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:33+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 16:07:33 GMT',
  'Link',
  '</revisions?key=listRevisions158696685341703334&api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODI3;sn=1902827',
  'x-ms-request-id',
  'e2e03b4a-5eba-4b80-a05d-3834dd770b7f',
  'x-ms-correlation-request-id',
  'e2e03b4a-5eba-4b80-a05d-3834dd770b7f',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
