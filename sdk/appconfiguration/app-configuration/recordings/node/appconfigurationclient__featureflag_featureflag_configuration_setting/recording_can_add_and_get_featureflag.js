let nock = require('nock');

module.exports.hash = "0f3d1c1e4498c8bfdfe2a40257d26862";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162093807733205068"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162093807733205068', {"key":".appconfig.featureflag/name-1162093807733205068","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807733205068\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"A5Qj2fIv5m4ja7pN4cIv9CB17zT","key":".appconfig.featureflag/name-1162093807733205068","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807733205068\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:37+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:37 GMT',
  'ETag',
  '"A5Qj2fIv5m4ja7pN4cIv9CB17zT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg0;sn=3267784',
  'x-ms-request-id',
  '867bbedd-e2c5-4fb2-8b2c-026e0e3e68d3',
  'x-ms-correlation-request-id',
  '867bbedd-e2c5-4fb2-8b2c-026e0e3e68d3',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162093807733205068')
  .query(true)
  .reply(200, {"etag":"A5Qj2fIv5m4ja7pN4cIv9CB17zT","key":".appconfig.featureflag/name-1162093807733205068","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807733205068\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:37+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:37 GMT',
  'ETag',
  '"A5Qj2fIv5m4ja7pN4cIv9CB17zT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg0;sn=3267784',
  'x-ms-request-id',
  'b9d279f8-0ffe-4efd-942c-bea982e4c69f',
  'x-ms-correlation-request-id',
  'b9d279f8-0ffe-4efd-942c-bea982e4c69f',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162093807733205068')
  .query(true)
  .reply(200, {"etag":"A5Qj2fIv5m4ja7pN4cIv9CB17zT","key":".appconfig.featureflag/name-1162093807733205068","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807733205068\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:37+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:33 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:37 GMT',
  'ETag',
  '"A5Qj2fIv5m4ja7pN4cIv9CB17zT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg1;sn=3267785',
  'x-ms-request-id',
  '7f37522e-b2de-4097-9a4c-caa79121bdfe',
  'x-ms-correlation-request-id',
  '7f37522e-b2de-4097-9a4c-caa79121bdfe',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
