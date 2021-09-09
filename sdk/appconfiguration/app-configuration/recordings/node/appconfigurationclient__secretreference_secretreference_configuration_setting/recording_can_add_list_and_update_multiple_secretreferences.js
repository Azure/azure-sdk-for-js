let nock = require('nock');

module.exports.hash = "6d49fc86f35574cb53bce8021e5755f4";

module.exports.testInfo = {"uniqueName":{"name-2":"name-2161736250391906013","name-3":"name-3161736250391900706","name-5":"name-5161736250422907435"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/name-3161736250391900706', {"key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}"})
  .query(true)
  .reply(200, {"etag":"oHhTHIwOX8S2SqoiGdkvyl8mpAt","key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:43+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:43 GMT',
  'ETag',
  '"oHhTHIwOX8S2SqoiGdkvyl8mpAt"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjc=;sn=3036067',
  'x-ms-request-id',
  '9335a747-8814-479e-aa92-92d2d08b0ece',
  'x-ms-correlation-request-id',
  '9335a747-8814-479e-aa92-92d2d08b0ece',
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
  .put('/kv/name-3161736250391900706-2', {"key":"name-3161736250391900706-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}"})
  .query(true)
  .reply(200, {"etag":"PR20Km4VgoXYQ6tap64aZ9ZvgvV","key":"name-3161736250391900706-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:44+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:44 GMT',
  'ETag',
  '"PR20Km4VgoXYQ6tap64aZ9ZvgvV"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjg=;sn=3036068',
  'x-ms-request-id',
  '2d5c435d-4fc5-4171-a4ed-a61f5b28ab0f',
  'x-ms-correlation-request-id',
  '2d5c435d-4fc5-4171-a4ed-a61f5b28ab0f',
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
  .reply(200, {"items":[{"etag":"oHhTHIwOX8S2SqoiGdkvyl8mpAt","key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:43+00:00"},{"etag":"PR20Km4VgoXYQ6tap64aZ9ZvgvV","key":"name-3161736250391900706-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:44+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjg=;sn=3036068',
  'x-ms-request-id',
  '65b35dc2-f741-402a-8492-5312ceb4209d',
  'x-ms-correlation-request-id',
  '65b35dc2-f741-402a-8492-5312ceb4209d',
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
  .put('/kv/name-3161736250391900706', {"key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161736250422907435\"}"})
  .query(true)
  .reply(200, {"etag":"aU5a3tU2BQ6FOX2F4XMsjfjUEWT","key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161736250422907435\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:44+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:44 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:44 GMT',
  'ETag',
  '"aU5a3tU2BQ6FOX2F4XMsjfjUEWT"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjk=;sn=3036069',
  'x-ms-request-id',
  '74f3434b-25a8-4b0f-b77a-ea0fd06da33f',
  'x-ms-correlation-request-id',
  '74f3434b-25a8-4b0f-b77a-ea0fd06da33f',
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
  .put('/locks/name-3161736250391900706-2')
  .query(true)
  .reply(200, {"etag":"utHqq8e86dQhoef4XjvhgRiz24P","key":"name-3161736250391900706-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":true,"last_modified":"2021-04-02T11:21:46+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:46 GMT',
  'ETag',
  '"utHqq8e86dQhoef4XjvhgRiz24P"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNzA=;sn=3036070',
  'x-ms-request-id',
  'f9b99f38-1c28-4e00-b16b-6fd4022dedae',
  'x-ms-correlation-request-id',
  'f9b99f38-1c28-4e00-b16b-6fd4022dedae',
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
  .reply(200, {"items":[{"etag":"aU5a3tU2BQ6FOX2F4XMsjfjUEWT","key":"name-3161736250391900706","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-5161736250422907435\"}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:44+00:00"},{"etag":"utHqq8e86dQhoef4XjvhgRiz24P","key":"name-3161736250391900706-2","label":"label-s","content_type":"application/vnd.microsoft.appconfig.keyvaultref+json;charset=utf-8","value":"{\"uri\":\"https://vault_name.vault.azure.net/secrets/name-2161736250391906013\"}","tags":{},"locked":true,"last_modified":"2021-04-02T11:21:46+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNzA=;sn=3036070',
  'x-ms-request-id',
  'cdbb73d9-4529-4775-b6ac-e7cc149bded8',
  'x-ms-correlation-request-id',
  'cdbb73d9-4529-4775-b6ac-e7cc149bded8',
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
  .delete('/kv/name-3161736250391900706-2')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:47 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'caf4721a-da0c-4df6-964a-2bd024935eed',
  'x-ms-correlation-request-id',
  'caf4721a-da0c-4df6-964a-2bd024935eed',
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
  .delete('/kv/name-3161736250391900706')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'd13d6103-9496-439f-ad4c-f252717874bf',
  'x-ms-correlation-request-id',
  'd13d6103-9496-439f-ad4c-f252717874bf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
