let nock = require('nock');

module.exports.hash = "fa7d33c98cf4f30fed04667749c4cbaa";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696685774604103"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696685774604103', {"key":"etags158696685774604103","value":"world"})
  .query(true)
  .reply(200, {"etag":"3hytDKHlJ8Xlj6BBRUmCDaeAr2e","key":"etags158696685774604103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"3hytDKHlJ8Xlj6BBRUmCDaeAr2e"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ1;sn=1902845',
  'x-ms-request-id',
  'ab567710-502c-49ff-a363-4e47b424830d',
  'x-ms-correlation-request-id',
  'ab567710-502c-49ff-a363-4e47b424830d',
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
  .put('/locks/etags158696685774604103')
  .query(true)
  .reply(200, {"etag":"A444sJ1FX62OCT4wk1YPYUhSBj9","key":"etags158696685774604103","label":null,"content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"A444sJ1FX62OCT4wk1YPYUhSBj9"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ2;sn=1902846',
  'x-ms-request-id',
  'b1a5fff2-cb9e-4ce8-a262-88b45740cdf5',
  'x-ms-correlation-request-id',
  'b1a5fff2-cb9e-4ce8-a262-88b45740cdf5',
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
  .delete('/kv/etags158696685774604103')
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'etags158696685774604103' is not allowed","name":"etags158696685774604103","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  'b1307f0b-6951-4a4b-aade-799f3156f0fd',
  'x-ms-correlation-request-id',
  'b1307f0b-6951-4a4b-aade-799f3156f0fd',
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
  .delete('/locks/etags158696685774604103')
  .query(true)
  .reply(200, {"etag":"8J53OTKx1etx0PVlyBT6gpeew8J","key":"etags158696685774604103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"8J53OTKx1etx0PVlyBT6gpeew8J"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ3;sn=1902847',
  'x-ms-request-id',
  '6305a3da-1128-4ad9-aa87-cc303bfefe54',
  'x-ms-correlation-request-id',
  '6305a3da-1128-4ad9-aa87-cc303bfefe54',
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
  .reply(200, {"items":[{"etag":"8J53OTKx1etx0PVlyBT6gpeew8J","key":"etags158696685774604103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ3;sn=1902847',
  'x-ms-request-id',
  '857aeb2c-7ae1-4b08-b790-e17f192bc795',
  'x-ms-correlation-request-id',
  '857aeb2c-7ae1-4b08-b790-e17f192bc795',
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
  .delete('/kv/etags158696685774604103')
  .query(true)
  .reply(200, {"etag":"8J53OTKx1etx0PVlyBT6gpeew8J","key":"etags158696685774604103","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:07:38+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:07:38 GMT',
  'ETag',
  '"8J53OTKx1etx0PVlyBT6gpeew8J"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODQ4;sn=1902848',
  'x-ms-request-id',
  '24dc4ada-98dc-49fe-a159-e86691d93596',
  'x-ms-correlation-request-id',
  '24dc4ada-98dc-49fe-a159-e86691d93596',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
