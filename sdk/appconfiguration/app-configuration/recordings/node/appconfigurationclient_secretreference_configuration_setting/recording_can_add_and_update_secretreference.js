let nock = require('nock');

module.exports.hash = "a9957c7b9cfbfcbbecbe8e53ed0fb850";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161727073431701823","name-3":"name-3161727073431701524","name-4":"name-4161727073488106751"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161727073431701524', {"key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073431701823\"}"})
  .query(true)
  .reply(200, {"etag":"9clx3p52mLOybg5yELR0OdyOkBG","key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073431701823\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:14+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:14 GMT',
  'ETag',
  '"9clx3p52mLOybg5yELR0OdyOkBG"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Nzk=;sn=3030679',
  'x-ms-request-id',
  '37a33f1b-6668-42a6-a90d-bb9b9e9c40ad',
  'x-ms-correlation-request-id',
  '37a33f1b-6668-42a6-a90d-bb9b9e9c40ad',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/name-3161727073431701524')
  .query(true)
  .reply(200, {"etag":"9clx3p52mLOybg5yELR0OdyOkBG","key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073431701823\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:14+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:14 GMT',
  'ETag',
  '"9clx3p52mLOybg5yELR0OdyOkBG"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Nzk=;sn=3030679',
  'x-ms-request-id',
  '8dadfbb9-f162-4509-b55f-c11d1877d523',
  'x-ms-correlation-request-id',
  '8dadfbb9-f162-4509-b55f-c11d1877d523',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161727073431701524', {"key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161727073488106751\"}","tags":{},"etag":"9clx3p52mLOybg5yELR0OdyOkBG"})
  .query(true)
  .reply(200, {"etag":"r8HpOzCxIibrgWWdgvRqaHzmf2A","key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161727073488106751\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:15+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:15 GMT',
  'ETag',
  '"r8HpOzCxIibrgWWdgvRqaHzmf2A"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODA=;sn=3030680',
  'x-ms-request-id',
  '6d3bca69-b745-4c8d-97bd-b05869735683',
  'x-ms-correlation-request-id',
  '6d3bca69-b745-4c8d-97bd-b05869735683',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/name-3161727073431701524')
  .query(true)
  .reply(200, {"etag":"r8HpOzCxIibrgWWdgvRqaHzmf2A","key":"name-3161727073431701524","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161727073488106751\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:15+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:15 GMT',
  'ETag',
  '"r8HpOzCxIibrgWWdgvRqaHzmf2A"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODA=;sn=3030680',
  'x-ms-request-id',
  '197d7ee7-2252-460f-ba6b-5632f4c26e8f',
  'x-ms-correlation-request-id',
  '197d7ee7-2252-460f-ba6b-5632f4c26e8f',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/name-3161727073431701524')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '2f97529e-7257-4499-9be3-3be9eea1b96c',
  'x-ms-correlation-request-id',
  '2f97529e-7257-4499-9be3-3be9eea1b96c',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
