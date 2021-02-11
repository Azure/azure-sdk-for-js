let nock = require('nock');

module.exports.hash = "424d92f65f4fac2c206bd85260efa031";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189225101584"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189225101584', {"key":"etags158700189225101584","value":"some value"})
  .query(true)
  .reply(200, {"etag":"Uuhvv6rQWuC2IuHO8YlEmdOZwId","key":"etags158700189225101584","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'ETag',
  '"Uuhvv6rQWuC2IuHO8YlEmdOZwId"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA0;sn=1904804',
  'x-ms-request-id',
  'f06a4cd1-6627-4274-b2ef-36f8a6aea6ce',
  'x-ms-correlation-request-id',
  'f06a4cd1-6627-4274-b2ef-36f8a6aea6ce',
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
  .get('/kv/etags158700189225101584')
  .query(true)
  .reply(200, {"etag":"Uuhvv6rQWuC2IuHO8YlEmdOZwId","key":"etags158700189225101584","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:32+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'ETag',
  '"Uuhvv6rQWuC2IuHO8YlEmdOZwId"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA0;sn=1904804',
  'x-ms-request-id',
  'd4c541e8-7432-49c4-9868-c1cb4ee46693',
  'x-ms-correlation-request-id',
  'd4c541e8-7432-49c4-9868-c1cb4ee46693',
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
  .put('/kv/etags158700189225101584', {"key":"etags158700189225101584","label":null,"content_type":null,"value":"some new value!","last_modified":"2020-04-16T01:51:32.000Z","tags":{},"etag":"Uuhvv6rQWuC2IuHO8YlEmdOZwId"})
  .query(true)
  .reply(200, {"etag":"v6dL0okPNADTeXw4hFGJAZmmXa7","key":"etags158700189225101584","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"v6dL0okPNADTeXw4hFGJAZmmXa7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA1;sn=1904805',
  'x-ms-request-id',
  '81fd64a0-4bf4-4aae-971a-408948ab3eec',
  'x-ms-correlation-request-id',
  '81fd64a0-4bf4-4aae-971a-408948ab3eec',
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
  .reply(200, {"items":[{"etag":"v6dL0okPNADTeXw4hFGJAZmmXa7","key":"etags158700189225101584","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA1;sn=1904805',
  'x-ms-request-id',
  '75fd6215-194e-45cd-aef0-58ca8c6f712e',
  'x-ms-correlation-request-id',
  '75fd6215-194e-45cd-aef0-58ca8c6f712e',
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
  .delete('/kv/etags158700189225101584')
  .query(true)
  .reply(200, {"etag":"v6dL0okPNADTeXw4hFGJAZmmXa7","key":"etags158700189225101584","label":null,"content_type":null,"value":"some new value!","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:33+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:32 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:33 GMT',
  'ETag',
  '"v6dL0okPNADTeXw4hFGJAZmmXa7"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODA2;sn=1904806',
  'x-ms-request-id',
  '93c8f6ca-a647-4941-8b04-2577b7b03187',
  'x-ms-correlation-request-id',
  '93c8f6ca-a647-4941-8b04-2577b7b03187',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
