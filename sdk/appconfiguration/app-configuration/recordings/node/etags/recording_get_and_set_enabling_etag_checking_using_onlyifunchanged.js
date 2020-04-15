let nock = require('nock');

module.exports.hash = "e0c64c969cf459afed031c66dee38c40";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696680080507384"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696680080507384', {"key":"etags158696680080507384","value":"some value"})
  .query(true)
  .reply(200, {"etag":"zc5KLiYaOqmo66zUFMwc3KcAxcu","key":"etags158696680080507384","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'ETag',
  '"zc5KLiYaOqmo66zUFMwc3KcAxcu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEw;sn=1902310',
  'x-ms-request-id',
  '14e4c276-9498-4d28-b192-c4b191286ed5',
  'x-ms-correlation-request-id',
  '14e4c276-9498-4d28-b192-c4b191286ed5',
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
  .get('/kv/etags158696680080507384')
  .query(true)
  .reply(200, {"etag":"zc5KLiYaOqmo66zUFMwc3KcAxcu","key":"etags158696680080507384","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'ETag',
  '"zc5KLiYaOqmo66zUFMwc3KcAxcu"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEw;sn=1902310',
  'x-ms-request-id',
  'ef870a8d-e068-4b01-ac96-df3d0d7cf63b',
  'x-ms-correlation-request-id',
  'ef870a8d-e068-4b01-ac96-df3d0d7cf63b',
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
  .put('/kv/etags158696680080507384', {"key":"etags158696680080507384","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T16:06:41.000Z","tags":{},"etag":"zc5KLiYaOqmo66zUFMwc3KcAxcu"})
  .query(true)
  .reply(200, {"etag":"JCRVAMSmEgv0hxH8ZN8tC6E5g94","key":"etags158696680080507384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'ETag',
  '"JCRVAMSmEgv0hxH8ZN8tC6E5g94"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEx;sn=1902311',
  'x-ms-request-id',
  '8428e26b-a8c6-41bc-9cb7-60b193008cb1',
  'x-ms-correlation-request-id',
  '8428e26b-a8c6-41bc-9cb7-60b193008cb1',
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
  .put('/kv/etags158696680080507384', {"key":"etags158696680080507384","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-15T16:06:41.000Z","tags":{},"etag":"bogus"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '5d3b32c9-915f-4e2a-92a1-00f761d779b4',
  'x-ms-correlation-request-id',
  '5d3b32c9-915f-4e2a-92a1-00f761d779b4',
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
  .reply(200, {"items":[{"etag":"JCRVAMSmEgv0hxH8ZN8tC6E5g94","key":"etags158696680080507384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:41+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEx;sn=1902311',
  'x-ms-request-id',
  'b8c265fd-82ea-4adc-9bff-276275f001c3',
  'x-ms-correlation-request-id',
  'b8c265fd-82ea-4adc-9bff-276275f001c3',
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
  .delete('/kv/etags158696680080507384')
  .query(true)
  .reply(200, {"etag":"JCRVAMSmEgv0hxH8ZN8tC6E5g94","key":"etags158696680080507384","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:41 GMT',
  'ETag',
  '"JCRVAMSmEgv0hxH8ZN8tC6E5g94"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzEy;sn=1902312',
  'x-ms-request-id',
  'c6eb3872-8605-4623-a8f8-83bdb2390272',
  'x-ms-correlation-request-id',
  'c6eb3872-8605-4623-a8f8-83bdb2390272',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
