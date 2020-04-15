let nock = require('nock');

module.exports.hash = "f70e238588f3f3f2b4abc2bfe3cd3749";

module.exports.testInfo = {"uniqueName":{"noLabelTests":"noLabelTests158696680665904295"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/noLabelTests158696680665904295', {"key":"noLabelTests158696680665904295","value":"added"})
  .query(true)
  .reply(200, {"etag":"MpLvjo9c7ePg9QSKSEq508NTwEN","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"MpLvjo9c7ePg9QSKSEq508NTwEN"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMy;sn=1902332',
  'x-ms-request-id',
  '17cb900f-fbb6-4598-8c38-ebaa8166e977',
  'x-ms-correlation-request-id',
  '17cb900f-fbb6-4598-8c38-ebaa8166e977',
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
  .get('/kv/noLabelTests158696680665904295')
  .query(true)
  .reply(200, {"etag":"MpLvjo9c7ePg9QSKSEq508NTwEN","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"MpLvjo9c7ePg9QSKSEq508NTwEN"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMy;sn=1902332',
  'x-ms-request-id',
  'd83a538a-d625-4084-bd09-6752fcca7582',
  'x-ms-correlation-request-id',
  'd83a538a-d625-4084-bd09-6752fcca7582',
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
  .delete('/kv/noLabelTests158696680665904295')
  .query(true)
  .reply(200, {"etag":"MpLvjo9c7ePg9QSKSEq508NTwEN","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"MpLvjo9c7ePg9QSKSEq508NTwEN"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzMz;sn=1902333',
  'x-ms-request-id',
  '502f1fa6-ee00-4683-b451-02659ca125f0',
  'x-ms-correlation-request-id',
  '502f1fa6-ee00-4683-b451-02659ca125f0',
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
  .put('/kv/noLabelTests158696680665904295', {"key":"noLabelTests158696680665904295","value":"set"})
  .query(true)
  .reply(200, {"etag":"XVTwcOU6KLK9RkeRSRItIQEoXPa","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"set","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"XVTwcOU6KLK9RkeRSRItIQEoXPa"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM0;sn=1902334',
  'x-ms-request-id',
  'f4bab852-b16c-4b2c-9fef-1d99e0907e23',
  'x-ms-correlation-request-id',
  'f4bab852-b16c-4b2c-9fef-1d99e0907e23',
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
  .get('/kv/noLabelTests158696680665904295')
  .query(true)
  .reply(200, {"etag":"XVTwcOU6KLK9RkeRSRItIQEoXPa","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"set","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"XVTwcOU6KLK9RkeRSRItIQEoXPa"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM0;sn=1902334',
  'x-ms-request-id',
  '106cf2e7-8bbc-4a17-9d9b-a9f88ddf5377',
  'x-ms-correlation-request-id',
  '106cf2e7-8bbc-4a17-9d9b-a9f88ddf5377',
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
  .put('/kv/noLabelTests158696680665904295', {"key":"noLabelTests158696680665904295","value":"set a second time"})
  .query(true)
  .reply(200, {"etag":"EMKu5qNPBvfc52PLVCiQUHaLWdE","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"EMKu5qNPBvfc52PLVCiQUHaLWdE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM1;sn=1902335',
  'x-ms-request-id',
  '57d70260-6f56-45eb-a456-6042f12143a0',
  'x-ms-correlation-request-id',
  '57d70260-6f56-45eb-a456-6042f12143a0',
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
  .get('/kv/noLabelTests158696680665904295')
  .query(true)
  .reply(200, {"etag":"EMKu5qNPBvfc52PLVCiQUHaLWdE","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"EMKu5qNPBvfc52PLVCiQUHaLWdE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM1;sn=1902335',
  'x-ms-request-id',
  'beb8393d-501e-4fad-aea5-99845e184c55',
  'x-ms-correlation-request-id',
  'beb8393d-501e-4fad-aea5-99845e184c55',
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
  .delete('/kv/noLabelTests158696680665904295')
  .query(true)
  .reply(200, {"etag":"EMKu5qNPBvfc52PLVCiQUHaLWdE","key":"noLabelTests158696680665904295","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:47+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:47 GMT',
  'ETag',
  '"EMKu5qNPBvfc52PLVCiQUHaLWdE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzM2;sn=1902336',
  'x-ms-request-id',
  '76545818-cf09-4086-a66f-692a4ad3799e',
  'x-ms-correlation-request-id',
  '76545818-cf09-4086-a66f-692a4ad3799e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
