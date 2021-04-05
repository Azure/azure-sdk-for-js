let nock = require('nock');

module.exports.hash = "a9957c7b9cfbfcbbecbe8e53ed0fb850";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161736250258906310","name-3":"name-3161736250258904150","name-4":"name-4161736250310202956"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161736250258904150', {"key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250258906310\"}"})
  .query(true)
  .reply(200, {"etag":"SoYpTkSGhqAsCyxYoISyPDqIU6z","key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250258906310\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:42+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'ETag',
  '"SoYpTkSGhqAsCyxYoISyPDqIU6z"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjU=;sn=3036065',
  'x-ms-request-id',
  '9c406cb9-2a8f-4d92-a3c1-0849ec71adb1',
  'x-ms-correlation-request-id',
  '9c406cb9-2a8f-4d92-a3c1-0849ec71adb1',
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
  .get('/kv/name-3161736250258904150')
  .query(true)
  .reply(200, {"etag":"SoYpTkSGhqAsCyxYoISyPDqIU6z","key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250258906310\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:42+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'ETag',
  '"SoYpTkSGhqAsCyxYoISyPDqIU6z"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjU=;sn=3036065',
  'x-ms-request-id',
  '722436bc-c235-4319-b382-16f10958f49d',
  'x-ms-correlation-request-id',
  '722436bc-c235-4319-b382-16f10958f49d',
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
  .put('/kv/name-3161736250258904150', {"key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161736250310202956\"}","tags":{},"etag":"SoYpTkSGhqAsCyxYoISyPDqIU6z"})
  .query(true)
  .reply(200, {"etag":"o9IWxpqj3axCY3cbOS5NUOODX9g","key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161736250310202956\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:42+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'ETag',
  '"o9IWxpqj3axCY3cbOS5NUOODX9g"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjY=;sn=3036066',
  'x-ms-request-id',
  'b5ca320b-fab4-44d4-81bd-418f88e4b2fd',
  'x-ms-correlation-request-id',
  'b5ca320b-fab4-44d4-81bd-418f88e4b2fd',
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
  .get('/kv/name-3161736250258904150')
  .query(true)
  .reply(200, {"etag":"o9IWxpqj3axCY3cbOS5NUOODX9g","key":"name-3161736250258904150","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-4161736250310202956\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:42+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:42 GMT',
  'ETag',
  '"o9IWxpqj3axCY3cbOS5NUOODX9g"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjY=;sn=3036066',
  'x-ms-request-id',
  '79664871-8f36-4967-b984-9040b1e9dfe5',
  'x-ms-correlation-request-id',
  '79664871-8f36-4967-b984-9040b1e9dfe5',
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
  .delete('/kv/name-3161736250258904150')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '8ca78901-1834-4236-8d1d-a8aaf32f1282',
  'x-ms-correlation-request-id',
  '8ca78901-1834-4236-8d1d-a8aaf32f1282',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
