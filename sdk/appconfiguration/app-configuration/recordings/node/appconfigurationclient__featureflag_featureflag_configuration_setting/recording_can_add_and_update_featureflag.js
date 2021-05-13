let nock = require('nock');

module.exports.hash = "7a13a128a290c5e391e72b4bdb9f113d";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162093807833509954"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162093807833509954', {"key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"4QhChPyoOAuxeGsZ6ACePanjIxd","key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:38 GMT',
  'ETag',
  '"4QhChPyoOAuxeGsZ6ACePanjIxd"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg2;sn=3267786',
  'x-ms-request-id',
  '2a51fed6-a915-453c-bb0a-cb6983cfe782',
  'x-ms-correlation-request-id',
  '2a51fed6-a915-453c-bb0a-cb6983cfe782',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162093807833509954')
  .query(true)
  .reply(200, {"etag":"4QhChPyoOAuxeGsZ6ACePanjIxd","key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:38 GMT',
  'ETag',
  '"4QhChPyoOAuxeGsZ6ACePanjIxd"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg2;sn=3267786',
  'x-ms-request-id',
  '5c1f417b-1935-44c1-99ce-633cded787fa',
  'x-ms-correlation-request-id',
  '5c1f417b-1935-44c1-99ce-633cded787fa',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162093807833509954', {"key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","last_modified":"2021-05-13T20:34:38.000Z","tags":{},"etag":"4QhChPyoOAuxeGsZ6ACePanjIxd"})
  .query(true)
  .reply(200, {"etag":"ieae4k8Pxf4BulWfwAOBcJ7CPvT","key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:39 GMT',
  'ETag',
  '"ieae4k8Pxf4BulWfwAOBcJ7CPvT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg3;sn=3267787',
  'x-ms-request-id',
  '99c1c9b7-9ec4-45ec-9580-418593c2cacf',
  'x-ms-correlation-request-id',
  '99c1c9b7-9ec4-45ec-9580-418593c2cacf',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162093807833509954')
  .query(true)
  .reply(200, {"etag":"ieae4k8Pxf4BulWfwAOBcJ7CPvT","key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:34 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:39 GMT',
  'ETag',
  '"ieae4k8Pxf4BulWfwAOBcJ7CPvT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg3;sn=3267787',
  'x-ms-request-id',
  'e2bc4c36-ba5d-48c2-92eb-6dd63cd931d0',
  'x-ms-correlation-request-id',
  'e2bc4c36-ba5d-48c2-92eb-6dd63cd931d0',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162093807833509954')
  .query(true)
  .reply(200, {"etag":"ieae4k8Pxf4BulWfwAOBcJ7CPvT","key":".appconfig.featureflag/name-1162093807833509954","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807833509954\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:39 GMT',
  'ETag',
  '"ieae4k8Pxf4BulWfwAOBcJ7CPvT"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg4;sn=3267788',
  'x-ms-request-id',
  'a9f447da-c890-4e7a-bed2-5d646b3a0146',
  'x-ms-correlation-request-id',
  'a9f447da-c890-4e7a-bed2-5d646b3a0146',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
