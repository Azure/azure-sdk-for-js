let nock = require('nock');

module.exports.hash = "505c9a3a224a00ff0b9a9c06eefae9e4";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161736250170700590","name-3":"name-3161736250170707837"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161736250170707837', {"key":"name-3161736250170707837","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250170700590\"}"})
  .query(true)
  .reply(200, {"etag":"wpeiKUlqzHn9DLVqMgvjq33XULc","key":"name-3161736250170707837","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250170700590\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:41+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:41 GMT',
  'ETag',
  '"wpeiKUlqzHn9DLVqMgvjq33XULc"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjQ=;sn=3036064',
  'x-ms-request-id',
  'fe55b3c8-d6b5-438a-8d68-8fbc30f41358',
  'x-ms-correlation-request-id',
  'fe55b3c8-d6b5-438a-8d68-8fbc30f41358',
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
  .get('/kv/name-3161736250170707837')
  .query(true)
  .reply(200, {"etag":"wpeiKUlqzHn9DLVqMgvjq33XULc","key":"name-3161736250170707837","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250170700590\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:41+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:41 GMT',
  'ETag',
  '"wpeiKUlqzHn9DLVqMgvjq33XULc"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjQ=;sn=3036064',
  'x-ms-request-id',
  '86de76bd-ce5c-46ea-bd40-1041c468815f',
  'x-ms-correlation-request-id',
  '86de76bd-ce5c-46ea-bd40-1041c468815f',
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
  .delete('/kv/name-3161736250170707837')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'ed499149-036a-4f00-9b3d-03fefae15bcb',
  'x-ms-correlation-request-id',
  'ed499149-036a-4f00-9b3d-03fefae15bcb',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
