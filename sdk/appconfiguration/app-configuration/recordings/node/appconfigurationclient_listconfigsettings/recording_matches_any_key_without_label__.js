let nock = require('nock');

module.exports.hash = "dd394790c3e39e920ba5f45ee3148eae";

module.exports.testInfo = {"uniqueName":{"backslash-zero-label-1":"backslash-zero-label-1165229044128405300","backslash-zero-label-2":"backslash-zero-label-2165229044128402610"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/backslash-zero-label-1165229044128405300', {"key":"backslash-zero-label-1165229044128405300","value":"[A] production value"})
  .query(true)
  .reply(200, {"etag":"xbqwHY7rLN5AALQlWBFpyC8Gz0Z","key":"backslash-zero-label-1165229044128405300","label":null,"content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Last-Modified',
  'Wed, 11 May 2022 17:34:02 GMT',
  'ETag',
  '"xbqwHY7rLN5AALQlWBFpyC8Gz0Z"',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM2;sn=6910536',
  'x-ms-request-id',
  '8e1e8938-fa5f-49bc-8115-88f415486293',
  'x-ms-correlation-request-id',
  '8e1e8938-fa5f-49bc-8115-88f415486293',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/backslash-zero-label-2165229044128402610', {"key":"backslash-zero-label-2165229044128402610","value":"[A] value"})
  .query(true)
  .reply(200, {"etag":"grQsXqCnsMeyo3Dg5G7dNOYBeWS","key":"backslash-zero-label-2165229044128402610","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Last-Modified',
  'Wed, 11 May 2022 17:34:02 GMT',
  'ETag',
  '"grQsXqCnsMeyo3Dg5G7dNOYBeWS"',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM3;sn=6910537',
  'x-ms-request-id',
  'b6fec351-bbcb-4a47-9207-b3ee54f71740',
  'x-ms-correlation-request-id',
  'b6fec351-bbcb-4a47-9207-b3ee54f71740',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/backslash-zero-label-2165229044128402610', {"key":"backslash-zero-label-2165229044128402610","label":"with label","value":"[B] value"})
  .query(true)
  .reply(200, {"etag":"i9KBcCC56BTdJSj0u6OKKRCnhM0","key":"backslash-zero-label-2165229044128402610","label":"with label","content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Last-Modified',
  'Wed, 11 May 2022 17:34:02 GMT',
  'ETag',
  '"i9KBcCC56BTdJSj0u6OKKRCnhM0"',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM4;sn=6910538',
  'x-ms-request-id',
  'd21941d6-4f9a-43c6-95a6-36dee1b05a48',
  'x-ms-correlation-request-id',
  'd21941d6-4f9a-43c6-95a6-36dee1b05a48',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"xbqwHY7rLN5AALQlWBFpyC8Gz0Z","key":"backslash-zero-label-1165229044128405300","label":null,"content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"grQsXqCnsMeyo3Dg5G7dNOYBeWS","key":"backslash-zero-label-2165229044128402610","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM4;sn=6910538',
  'x-ms-request-id',
  '895bad39-8768-414c-a8a1-7facd759ea0d',
  'x-ms-correlation-request-id',
  '895bad39-8768-414c-a8a1-7facd759ea0d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"xbqwHY7rLN5AALQlWBFpyC8Gz0Z","key":"backslash-zero-label-1165229044128405300","label":null,"content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"grQsXqCnsMeyo3Dg5G7dNOYBeWS","key":"backslash-zero-label-2165229044128402610","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM4;sn=6910538',
  'x-ms-request-id',
  'dcba6471-6bc5-4e7c-b8d1-7c556aba087d',
  'x-ms-correlation-request-id',
  'dcba6471-6bc5-4e7c-b8d1-7c556aba087d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"xbqwHY7rLN5AALQlWBFpyC8Gz0Z","key":"backslash-zero-label-1165229044128405300","label":null,"content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"grQsXqCnsMeyo3Dg5G7dNOYBeWS","key":"backslash-zero-label-2165229044128402610","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"i9KBcCC56BTdJSj0u6OKKRCnhM0","key":"backslash-zero-label-2165229044128402610","label":"with label","content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:01 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM4;sn=6910538',
  'x-ms-request-id',
  '9e547d3c-a9dc-412d-9685-d0e8fac1acec',
  'x-ms-correlation-request-id',
  '9e547d3c-a9dc-412d-9685-d0e8fac1acec',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"xbqwHY7rLN5AALQlWBFpyC8Gz0Z","key":"backslash-zero-label-1165229044128405300","label":null,"content_type":null,"value":"[A] production value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"grQsXqCnsMeyo3Dg5G7dNOYBeWS","key":"backslash-zero-label-2165229044128402610","label":null,"content_type":null,"value":"[A] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"},{"etag":"i9KBcCC56BTdJSj0u6OKKRCnhM0","key":"backslash-zero-label-2165229044128402610","label":"with label","content_type":null,"value":"[B] value","tags":{},"locked":false,"last_modified":"2022-05-11T17:34:02+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Wed, 11 May 2022 17:34:02 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'keep-alive',
  'Sync-Token',
  'zAJw6V16=NjoxNyM2OTEwNTM4;sn=6910538',
  'x-ms-request-id',
  '56719c4d-48a7-4f07-8164-fb053fc306da',
  'x-ms-correlation-request-id',
  '56719c4d-48a7-4f07-8164-fb053fc306da',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate, traceparent, tracestate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
