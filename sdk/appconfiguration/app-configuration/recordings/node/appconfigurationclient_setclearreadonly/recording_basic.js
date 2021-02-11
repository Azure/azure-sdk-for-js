let nock = require('nock');

module.exports.hash = "3c2639db1dd5f79bc5284f0c1e3f2a91";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158700229395903061"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158700229395903061', {"key":"readOnlyTests158700229395903061","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"ZLHgeRYhOZ7RHd1nFgqMWa4vcmq","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:14+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'ETag',
  '"ZLHgeRYhOZ7RHd1nFgqMWa4vcmq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM2;sn=1904836',
  'x-ms-request-id',
  '2ddaeb0c-0f43-4d82-9e6c-ae2f76d60084',
  'x-ms-correlation-request-id',
  '2ddaeb0c-0f43-4d82-9e6c-ae2f76d60084',
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
  .get('/kv/readOnlyTests158700229395903061')
  .query(true)
  .reply(200, {"etag":"ZLHgeRYhOZ7RHd1nFgqMWa4vcmq","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:14+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'ETag',
  '"ZLHgeRYhOZ7RHd1nFgqMWa4vcmq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM2;sn=1904836',
  'x-ms-request-id',
  '2c37a6db-4ec2-4bc9-9a5f-016d0caac6e1',
  'x-ms-correlation-request-id',
  '2c37a6db-4ec2-4bc9-9a5f-016d0caac6e1',
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
  .put('/locks/readOnlyTests158700229395903061')
  .query(true)
  .reply(200, {"etag":"Or37gPTWsEWesXxQq3HZVsZycbU","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-16T01:58:14+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'ETag',
  '"Or37gPTWsEWesXxQq3HZVsZycbU"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM3;sn=1904837',
  'x-ms-request-id',
  '4bf1b1a0-9498-46f6-ae0c-ff020cea9354',
  'x-ms-correlation-request-id',
  '4bf1b1a0-9498-46f6-ae0c-ff020cea9354',
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
  .get('/kv/readOnlyTests158700229395903061')
  .query(true)
  .reply(200, {"etag":"Or37gPTWsEWesXxQq3HZVsZycbU","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-16T01:58:14+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'ETag',
  '"Or37gPTWsEWesXxQq3HZVsZycbU"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM3;sn=1904837',
  'x-ms-request-id',
  'f5afbefd-ac02-4fc5-a8f2-d84d1fa8e7b7',
  'x-ms-correlation-request-id',
  'f5afbefd-ac02-4fc5-a8f2-d84d1fa8e7b7',
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
  .put('/kv/readOnlyTests158700229395903061', {"key":"readOnlyTests158700229395903061","label":"some label","value":"world"})
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158700229395903061' is not allowed","name":"readOnlyTests158700229395903061","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  'f0608484-ff2e-4b61-a4d8-cc8c55b5fa3c',
  'x-ms-correlation-request-id',
  'f0608484-ff2e-4b61-a4d8-cc8c55b5fa3c',
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
  .delete('/kv/readOnlyTests158700229395903061')
  .query(true)
  .reply(409, {"type":"https://azconfig.io/errors/key-locked","title":"Modifing key 'readOnlyTests158700229395903061' is not allowed","name":"readOnlyTests158700229395903061","detail":"The key is read-only. To allow modification unlock it first.","status":409}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/problem+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'x-ms-request-id',
  '6b138a6f-7d7e-4e6f-8468-49c99e809f6f',
  'x-ms-correlation-request-id',
  '6b138a6f-7d7e-4e6f-8468-49c99e809f6f',
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
  .reply(200, {"items":[{"etag":"Or37gPTWsEWesXxQq3HZVsZycbU","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":true,"last_modified":"2020-04-16T01:58:14+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM3;sn=1904837',
  'x-ms-request-id',
  '03521597-5c69-433b-a9c0-a1f1d373d7cb',
  'x-ms-correlation-request-id',
  '03521597-5c69-433b-a9c0-a1f1d373d7cb',
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
  .delete('/locks/readOnlyTests158700229395903061')
  .query(true)
  .reply(200, {"etag":"rQ0jkVVfIQWtVawOT9ZSCxcVSOE","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'ETag',
  '"rQ0jkVVfIQWtVawOT9ZSCxcVSOE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM4;sn=1904838',
  'x-ms-request-id',
  'b62deab2-5057-4d86-89a5-9faeb0e2091c',
  'x-ms-correlation-request-id',
  'b62deab2-5057-4d86-89a5-9faeb0e2091c',
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
  .delete('/kv/readOnlyTests158700229395903061')
  .query(true)
  .reply(200, {"etag":"rQ0jkVVfIQWtVawOT9ZSCxcVSOE","key":"readOnlyTests158700229395903061","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'ETag',
  '"rQ0jkVVfIQWtVawOT9ZSCxcVSOE"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODM5;sn=1904839',
  'x-ms-request-id',
  'f187267a-5e35-4118-8bd1-9e194e3be65d',
  'x-ms-correlation-request-id',
  'f187267a-5e35-4118-8bd1-9e194e3be65d',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
