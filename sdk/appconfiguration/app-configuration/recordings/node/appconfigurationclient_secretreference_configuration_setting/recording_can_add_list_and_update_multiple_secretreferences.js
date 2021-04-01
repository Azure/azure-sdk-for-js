let nock = require('nock');

module.exports.hash = "b4a0c9bd7dbaf880005fc7e37af01169";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161727073573502374","name-3":"name-3161727073573502979","name-5":"name-5161727073599408784"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161727073573502979', {"key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}"})
  .query(true)
  .reply(200, {"etag":"I9YupYSj1oJt9iMGQ9182qHQH9u","key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'ETag',
  '"I9YupYSj1oJt9iMGQ9182qHQH9u"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODE=;sn=3030681',
  'x-ms-request-id',
  '75fa4b1c-e25d-4543-a3f9-f0c96303ff56',
  'x-ms-correlation-request-id',
  '75fa4b1c-e25d-4543-a3f9-f0c96303ff56',
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
  .put('/kv/name-3161727073573502979-2', {"key":"name-3161727073573502979-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}"})
  .query(true)
  .reply(200, {"etag":"F6Xhn8XTexGUi19MlmuYgMqZFIY","key":"name-3161727073573502979-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"}, [
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
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'ETag',
  '"F6Xhn8XTexGUi19MlmuYgMqZFIY"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODI=;sn=3030682',
  'x-ms-request-id',
  '4b3a346b-dc79-4b6d-9c0d-7583041ec800',
  'x-ms-correlation-request-id',
  '4b3a346b-dc79-4b6d-9c0d-7583041ec800',
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
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"I9YupYSj1oJt9iMGQ9182qHQH9u","key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"},{"etag":"F6Xhn8XTexGUi19MlmuYgMqZFIY","key":"name-3161727073573502979-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODI=;sn=3030682',
  'x-ms-request-id',
  '4120b416-ba57-4beb-8ae2-8a930a732205',
  'x-ms-correlation-request-id',
  '4120b416-ba57-4beb-8ae2-8a930a732205',
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
  .put('/kv/name-3161727073573502979', {"key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161727073599408784\"}"})
  .query(true)
  .reply(200, {"etag":"Qrc2lygn505tdOc9ZlUXv1G7x7h","key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161727073599408784\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:17 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'ETag',
  '"Qrc2lygn505tdOc9ZlUXv1G7x7h"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODM=;sn=3030683',
  'x-ms-request-id',
  '234cc4db-4bd4-402c-82b3-5a8af51f3ff2',
  'x-ms-correlation-request-id',
  '234cc4db-4bd4-402c-82b3-5a8af51f3ff2',
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
  .put('/locks/name-3161727073573502979-2')
  .query(true)
  .reply(200, {"etag":"fcQO0dSZGtVEanPOL8sUScVF731","key":"name-3161727073573502979-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":true,"last_modified":"2021-04-01T09:52:17+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:17 GMT',
  'ETag',
  '"fcQO0dSZGtVEanPOL8sUScVF731"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODQ=;sn=3030684',
  'x-ms-request-id',
  '45b0802a-9f31-43a0-8a35-abd8b2c9a28a',
  'x-ms-correlation-request-id',
  '45b0802a-9f31-43a0-8a35-abd8b2c9a28a',
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
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"Qrc2lygn505tdOc9ZlUXv1G7x7h","key":"name-3161727073573502979","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161727073599408784\"}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:16+00:00"},{"etag":"fcQO0dSZGtVEanPOL8sUScVF731","key":"name-3161727073573502979-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161727073573502374\"}","tags":{},"locked":true,"last_modified":"2021-04-01T09:52:17+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:17 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2ODQ=;sn=3030684',
  'x-ms-request-id',
  '321e5b1e-385c-4366-9052-ab2ea3b4c6ad',
  'x-ms-correlation-request-id',
  '321e5b1e-385c-4366-9052-ab2ea3b4c6ad',
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
  .delete('/kv/name-3161727073573502979-2')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:17 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'c49af6ea-1247-4dd0-a4c5-7f14e9036ea1',
  'x-ms-correlation-request-id',
  'c49af6ea-1247-4dd0-a4c5-7f14e9036ea1',
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
  .delete('/kv/name-3161727073573502979')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:18 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'affb9d48-91fa-4d8f-bfdc-edd7dbfd5319',
  'x-ms-correlation-request-id',
  'affb9d48-91fa-4d8f-bfdc-edd7dbfd5319',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
