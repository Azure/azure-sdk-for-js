let nock = require('nock');

module.exports.hash = "c293f1ceb13451762a010d9bc9fe9eab";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189432305518"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189432305518', {"key":"etags158700189432305518","value":"some value"})
  .query(true)
  .reply(200, {"etag":"F4P1iwPzz6KYVPFifkyTqM7rx3K","key":"etags158700189432305518","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:34+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'ETag',
  '"F4P1iwPzz6KYVPFifkyTqM7rx3K"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODEz;sn=1904813',
  'x-ms-request-id',
  '748c2eb5-b0ec-4c40-9a06-3aa791c01789',
  'x-ms-correlation-request-id',
  '748c2eb5-b0ec-4c40-9a06-3aa791c01789',
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
  .put('/kv/etags158700189432305518', {"key":"etags158700189432305518","value":"world"})
  .query(true)
  .reply(200, {"etag":"qy1Qw1zTRuG1C63rISfzA2sgeBA","key":"etags158700189432305518","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"qy1Qw1zTRuG1C63rISfzA2sgeBA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE0;sn=1904814',
  'x-ms-request-id',
  'cad33067-fbeb-4836-bd6b-46de3225d163',
  'x-ms-correlation-request-id',
  'cad33067-fbeb-4836-bd6b-46de3225d163',
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
  .get('/kv/etags158700189432305518')
  .query(true)
  .reply(304, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Connection',
  'close',
  'ETag',
  '"qy1Qw1zTRuG1C63rISfzA2sgeBA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE0;sn=1904814',
  'x-ms-request-id',
  '856c1994-8ab2-4fed-a711-b1f0e2ee7332',
  'x-ms-correlation-request-id',
  '856c1994-8ab2-4fed-a711-b1f0e2ee7332',
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
  .put('/kv/etags158700189432305518', {"key":"etags158700189432305518","value":"new world"})
  .query(true)
  .reply(200, {"etag":"LimXpnDffWAuIdBCPxvhTfI9KKP","key":"etags158700189432305518","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"LimXpnDffWAuIdBCPxvhTfI9KKP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE1;sn=1904815',
  'x-ms-request-id',
  'd6ed179b-2619-46ca-8e1a-d3e9eb24594c',
  'x-ms-correlation-request-id',
  'd6ed179b-2619-46ca-8e1a-d3e9eb24594c',
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
  .get('/kv/etags158700189432305518')
  .query(true)
  .reply(200, {"etag":"LimXpnDffWAuIdBCPxvhTfI9KKP","key":"etags158700189432305518","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"LimXpnDffWAuIdBCPxvhTfI9KKP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE1;sn=1904815',
  'x-ms-request-id',
  '12ded1db-7146-4768-886b-681a5e4ee13e',
  'x-ms-correlation-request-id',
  '12ded1db-7146-4768-886b-681a5e4ee13e',
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
  .get('/kv/etags158700189432305518')
  .query(true)
  .reply(200, {"etag":"LimXpnDffWAuIdBCPxvhTfI9KKP","key":"etags158700189432305518","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"LimXpnDffWAuIdBCPxvhTfI9KKP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE1;sn=1904815',
  'x-ms-request-id',
  'e87ed8c0-7c10-4716-8a0c-297b209b65ef',
  'x-ms-correlation-request-id',
  'e87ed8c0-7c10-4716-8a0c-297b209b65ef',
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
  .reply(200, {"items":[{"etag":"LimXpnDffWAuIdBCPxvhTfI9KKP","key":"etags158700189432305518","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE1;sn=1904815',
  'x-ms-request-id',
  '456d4ace-2754-4aa2-a045-1e6471c4ce7a',
  'x-ms-correlation-request-id',
  '456d4ace-2754-4aa2-a045-1e6471c4ce7a',
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
  .delete('/kv/etags158700189432305518')
  .query(true)
  .reply(200, {"etag":"LimXpnDffWAuIdBCPxvhTfI9KKP","key":"etags158700189432305518","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"LimXpnDffWAuIdBCPxvhTfI9KKP"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE2;sn=1904816',
  'x-ms-request-id',
  'bc099da5-4f68-4aa0-865a-2c24f5376ca1',
  'x-ms-correlation-request-id',
  'bc099da5-4f68-4aa0-865a-2c24f5376ca1',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
