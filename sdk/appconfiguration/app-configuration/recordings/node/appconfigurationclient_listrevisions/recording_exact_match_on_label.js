let nock = require('nock');

module.exports.hash = "e97822f3e4823956e7f83cce61a9f719";

module.exports.testInfo = {"uniqueName":{"listRevisions":"listRevisions158690906268606400","list-revisions-A":"list-revisions-A158690906268603728","list-revisions-B":"list-revisions-B158690906268605447"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/listRevisions158690906268606400', {"key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","value":"fooA1"})
  .query(true)
  .reply(200, {"etag":"hpj8FX5LUmfO4aOMZ9cT9q5mBpb","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:23+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:22 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:23 GMT',
  'ETag',
  '"hpj8FX5LUmfO4aOMZ9cT9q5mBpb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODky;sn=1897892',
  'x-ms-request-id',
  '0e2fead7-9a18-40b6-8137-5be006b97521',
  'x-ms-correlation-request-id',
  '0e2fead7-9a18-40b6-8137-5be006b97521',
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
  .put('/kv/listRevisions158690906268606400', {"key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","value":"fooA2"})
  .query(true)
  .reply(200, {"etag":"V3brSREPDDHqhsoP1Zb7hRlYwpw","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:23 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:24 GMT',
  'ETag',
  '"V3brSREPDDHqhsoP1Zb7hRlYwpw"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODkz;sn=1897893',
  'x-ms-request-id',
  '9a5975ef-358f-40ac-b220-2153e0e8de76',
  'x-ms-correlation-request-id',
  '9a5975ef-358f-40ac-b220-2153e0e8de76',
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
  .put('/kv/listRevisions158690906268606400', {"key":"listRevisions158690906268606400","label":"list-revisions-B158690906268605447","value":"fooB1"})
  .query(true)
  .reply(200, {"etag":"146HvcgofcpO0WMx6xr6RWXDHAe","key":"listRevisions158690906268606400","label":"list-revisions-B158690906268605447","content_type":null,"value":"fooB1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}, [
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
  '"146HvcgofcpO0WMx6xr6RWXDHAe"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk0;sn=1897894',
  'x-ms-request-id',
  '59648789-d824-4911-981f-cf12e5c0a70e',
  'x-ms-correlation-request-id',
  '59648789-d824-4911-981f-cf12e5c0a70e',
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
  .put('/kv/listRevisions158690906268606400', {"key":"listRevisions158690906268606400","label":"list-revisions-B158690906268605447","value":"fooB2"})
  .query(true)
  .reply(200, {"etag":"uQQvZhToIfHR1hPbvOePN3ucRdg","key":"listRevisions158690906268606400","label":"list-revisions-B158690906268605447","content_type":null,"value":"fooB2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"}, [
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
  '"uQQvZhToIfHR1hPbvOePN3ucRdg"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk1;sn=1897895',
  'x-ms-request-id',
  '701f3d9b-b083-4493-a3a2-cd3127779590',
  'x-ms-correlation-request-id',
  '701f3d9b-b083-4493-a3a2-cd3127779590',
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
  .reply(200, {"items":[{"etag":"V3brSREPDDHqhsoP1Zb7hRlYwpw","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"},{"etag":"hpj8FX5LUmfO4aOMZ9cT9q5mBpb","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:23+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk1;sn=1897895',
  'x-ms-request-id',
  'a64db920-1621-4595-b807-e5a42fc46317',
  'x-ms-correlation-request-id',
  'a64db920-1621-4595-b807-e5a42fc46317',
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
  .reply(200, {"items":[{"etag":"V3brSREPDDHqhsoP1Zb7hRlYwpw","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA2","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:24+00:00"},{"etag":"hpj8FX5LUmfO4aOMZ9cT9q5mBpb","key":"listRevisions158690906268606400","label":"list-revisions-A158690906268603728","content_type":null,"value":"fooA1","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:23+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:24 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3ODk1;sn=1897895',
  'x-ms-request-id',
  '1f58d344-e4eb-4226-a9d2-46500b72e6f9',
  'x-ms-correlation-request-id',
  '1f58d344-e4eb-4226-a9d2-46500b72e6f9',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
