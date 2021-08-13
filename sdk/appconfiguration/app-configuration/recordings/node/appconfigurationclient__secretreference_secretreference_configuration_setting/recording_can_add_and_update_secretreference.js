let nock = require('nock');

module.exports.hash = "c00f9a15758be1f1fee37f6141028997";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2162093726919105600","name-3":"name-3162093726919107797","name-4":"name-4162093726972400899"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3162093726919107797', {"key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2162093726919105600\"}"})
  .query(true)
  .reply(200, {"etag":"1aSiPnzSrPJ20LGrOotkYPEiRRe","key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2162093726919105600\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:21:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:21:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:21:09 GMT',
  'ETag',
  '"1aSiPnzSrPJ20LGrOotkYPEiRRe"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzc2;sn=3267776',
  'x-ms-request-id',
  '05d8abc8-b4fd-4b1f-95d2-7b80e0d60c95',
  'x-ms-correlation-request-id',
  '05d8abc8-b4fd-4b1f-95d2-7b80e0d60c95',
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
  .get('/kv/name-3162093726919107797')
  .query(true)
  .reply(200, {"etag":"1aSiPnzSrPJ20LGrOotkYPEiRRe","key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2162093726919105600\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:21:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:21:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:21:09 GMT',
  'ETag',
  '"1aSiPnzSrPJ20LGrOotkYPEiRRe"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzc2;sn=3267776',
  'x-ms-request-id',
  '04ea8924-ad2c-44db-8380-03ce55df7b0c',
  'x-ms-correlation-request-id',
  '04ea8924-ad2c-44db-8380-03ce55df7b0c',
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
  .put('/kv/name-3162093726919107797', {"key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4162093726972400899\"}","last_modified":"2021-05-13T20:21:09.000Z","tags":{},"etag":"1aSiPnzSrPJ20LGrOotkYPEiRRe"})
  .query(true)
  .reply(200, {"etag":"HlHECq9MMkEdadjVLOAkHWkZfbd","key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4162093726972400899\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:21:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:21:07 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:21:09 GMT',
  'ETag',
  '"HlHECq9MMkEdadjVLOAkHWkZfbd"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzc3;sn=3267777',
  'x-ms-request-id',
  'ba0a1264-22cb-4aab-9f57-a8872cbd0f70',
  'x-ms-correlation-request-id',
  'ba0a1264-22cb-4aab-9f57-a8872cbd0f70',
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
  .get('/kv/name-3162093726919107797')
  .query(true)
  .reply(200, {"etag":"HlHECq9MMkEdadjVLOAkHWkZfbd","key":"name-3162093726919107797","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4162093726972400899\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:21:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:21:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:21:09 GMT',
  'ETag',
  '"HlHECq9MMkEdadjVLOAkHWkZfbd"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzc3;sn=3267777',
  'x-ms-request-id',
  'c5fb0dd1-4061-4810-9814-17fc4a09f243',
  'x-ms-correlation-request-id',
  'c5fb0dd1-4061-4810-9814-17fc4a09f243',
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
  .delete('/kv/name-3162093726919107797')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:21:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'cec017da-077d-436a-90ec-05aa61fd774b',
  'x-ms-correlation-request-id',
  'cec017da-077d-436a-90ec-05aa61fd774b',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
