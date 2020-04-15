let nock = require('nock');

module.exports.hash = "fa7d33c98cf4f30fed04667749c4cbaa";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690907513706189"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690907513706189', {"key":"etags158690907513706189","value":"world"})
  .query(true)
  .reply(200, {"etag":"M6Lcs9ZXgeQkcv3zk7I219jOCVa","key":"etags158690907513706189","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"M6Lcs9ZXgeQkcv3zk7I219jOCVa"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTMz;sn=1897933',
  'x-ms-request-id',
  '7e387032-10ee-4eac-8fd4-c857e9695d41',
  'x-ms-correlation-request-id',
  '7e387032-10ee-4eac-8fd4-c857e9695d41',
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
  .put('/locks/etags158690907513706189')
  .query(true)
  .reply(200, {"etag":"ueXrC7Yf0ojLdFis1AmjBEB4o5i","key":"etags158690907513706189","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T00:04:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'ETag',
  '"ueXrC7Yf0ojLdFis1AmjBEB4o5i"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM0;sn=1897934',
  'x-ms-request-id',
  '41341bc2-b55a-494d-ad77-811729c9b8d4',
  'x-ms-correlation-request-id',
  '41341bc2-b55a-494d-ad77-811729c9b8d4',
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
  .delete('/kv/etags158690907513706189')
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'etags158690907513706189' is not allowed","name":"etags158690907513706189","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '5e69beb4-18e8-44e5-93e3-dba14aafff8a',
  'x-ms-correlation-request-id',
  '5e69beb4-18e8-44e5-93e3-dba14aafff8a',
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
  .delete('/locks/etags158690907513706189')
  .query(true)
  .reply(200, {"etag":"6CDq2b7wi9yUGJrue7dJXqpADHp","key":"etags158690907513706189","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"6CDq2b7wi9yUGJrue7dJXqpADHp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM1;sn=1897935',
  'x-ms-request-id',
  '9c2f580d-bf7d-46a8-b377-98df42af6131',
  'x-ms-correlation-request-id',
  '9c2f580d-bf7d-46a8-b377-98df42af6131',
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
  .reply(200, {"items":[{"etag":"6CDq2b7wi9yUGJrue7dJXqpADHp","key":"etags158690907513706189","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM1;sn=1897935',
  'x-ms-request-id',
  '1205b206-0d75-44a8-a476-12e8078cf09d',
  'x-ms-correlation-request-id',
  '1205b206-0d75-44a8-a476-12e8078cf09d',
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
  .delete('/kv/etags158690907513706189')
  .query(true)
  .reply(200, {"etag":"6CDq2b7wi9yUGJrue7dJXqpADHp","key":"etags158690907513706189","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:04:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:04:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:04:36 GMT',
  'ETag',
  '"6CDq2b7wi9yUGJrue7dJXqpADHp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3OTM2;sn=1897936',
  'x-ms-request-id',
  'e3c6f4a9-9913-44e9-a1eb-f7e8f5868e69',
  'x-ms-correlation-request-id',
  'e3c6f4a9-9913-44e9-a1eb-f7e8f5868e69',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
