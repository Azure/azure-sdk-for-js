let nock = require('nock');

module.exports.hash = "65120c9396153f341228a1f66b3ae218";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907626507221"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907626507221', {"key":"etags158690907626507221","value":"world"})
  .query(true)
  .reply(200, {"etag":"mvkMhCNQhpY3LQ91cigDHeCn1eb","key":"etags158690907626507221","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"mvkMhCNQhpY3LQ91cigDHeCn1eb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM5;sn=1897939',
  'x-ms-request-id',
  '3516b19d-74f5-44cd-9f13-e4a05c27a980',
  'x-ms-correlation-request-id',
  '3516b19d-74f5-44cd-9f13-e4a05c27a980',
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
  .delete('/kv/bogus%20key%20etags158690907626507221')
  .query(true)
  .reply(204, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '00f4b9c0-1ec0-413e-8c9b-b5ad9fe31cfb',
  'x-ms-correlation-request-id',
  '00f4b9c0-1ec0-413e-8c9b-b5ad9fe31cfb',
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
  .reply(200, {"items":[{"etag":"mvkMhCNQhpY3LQ91cigDHeCn1eb","key":"etags158690907626507221","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM5;sn=1897939',
  'x-ms-request-id',
  'a11d68d0-2366-4244-9aad-35105a276401',
  'x-ms-correlation-request-id',
  'a11d68d0-2366-4244-9aad-35105a276401',
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
  .delete('/kv/etags158690907626507221')
  .query(true)
  .reply(200, {"etag":"mvkMhCNQhpY3LQ91cigDHeCn1eb","key":"etags158690907626507221","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"mvkMhCNQhpY3LQ91cigDHeCn1eb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTQw;sn=1897940',
  'x-ms-request-id',
  '242acfa3-b856-44c4-b68f-579e2ca9ec31',
  'x-ms-correlation-request-id',
  '242acfa3-b856-44c4-b68f-579e2ca9ec31',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
