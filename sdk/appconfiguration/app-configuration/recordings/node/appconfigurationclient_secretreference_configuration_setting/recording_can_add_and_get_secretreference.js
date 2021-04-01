let nock = require('nock');

module.exports.hash = "505c9a3a224a00ff0b9a9c06eefae9e4";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161727073344802614","name-3":"name-3161727073344802596"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161727073344802596', {"key":"name-3161727073344802596","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073344802614\"}"})
  .query(true)
  .reply(200, {"etag":"2pCLRTH84Qyodv6bzHnpAyjHJls","key":"name-3161727073344802596","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073344802614\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:13+00:00"}, [
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
  'Thu, 01 Apr 2021 09:52:13 GMT',
  'ETag',
  '"2pCLRTH84Qyodv6bzHnpAyjHJls"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Nzg=;sn=3030678',
  'x-ms-request-id',
  'cc1396e6-f3eb-4f90-8ea8-5d66173e87cc',
  'x-ms-correlation-request-id',
  'cc1396e6-f3eb-4f90-8ea8-5d66173e87cc',
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
  .get('/kv/name-3161727073344802596')
  .query(true)
  .reply(200, {"etag":"2pCLRTH84Qyodv6bzHnpAyjHJls","key":"name-3161727073344802596","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073344802614\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:13+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:13 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:13 GMT',
  'ETag',
  '"2pCLRTH84Qyodv6bzHnpAyjHJls"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Nzg=;sn=3030678',
  'x-ms-request-id',
  '5effd0c1-3b28-4b65-b111-ad302151477f',
  'x-ms-correlation-request-id',
  '5effd0c1-3b28-4b65-b111-ad302151477f',
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
  .delete('/kv/name-3161727073344802596')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:14 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '95903e9d-ae5d-4c02-9711-86412696f7c7',
  'x-ms-correlation-request-id',
  '95903e9d-ae5d-4c02-9711-86412696f7c7',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
