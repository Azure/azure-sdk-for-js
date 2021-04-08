let nock = require('nock');

module.exports.hash = "0cc988c098bc8745cc267bc5c3792b4a";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1161736249956207002"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1161736249956207002', {"key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"YzAo7BoElnaZyBpV7qQTmHF6yAL","key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:39 GMT',
  'ETag',
  '"YzAo7BoElnaZyBpV7qQTmHF6yAL"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTk=;sn=3036059',
  'x-ms-request-id',
  '78a8d14e-50d8-4236-8bf2-6e84e1309fe6',
  'x-ms-correlation-request-id',
  '78a8d14e-50d8-4236-8bf2-6e84e1309fe6',
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
  .put('/kv/.appconfig.featureflag%2Fname-1161736249956207002-2', {"key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"h7SXoBgaTaRLWZ7bvuIbwcl5OcZ","key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:39 GMT',
  'ETag',
  '"h7SXoBgaTaRLWZ7bvuIbwcl5OcZ"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjA=;sn=3036060',
  'x-ms-request-id',
  '2cbf20e5-12ee-4b11-b50b-07ef6b0b1f79',
  'x-ms-correlation-request-id',
  '2cbf20e5-12ee-4b11-b50b-07ef6b0b1f79',
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
  .reply(200, {"items":[{"etag":"YzAo7BoElnaZyBpV7qQTmHF6yAL","key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:39+00:00"},{"etag":"h7SXoBgaTaRLWZ7bvuIbwcl5OcZ","key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:39+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:39 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjA=;sn=3036060',
  'x-ms-request-id',
  'dfc4296a-5baa-4850-9ddb-6989f1df1f15',
  'x-ms-correlation-request-id',
  'dfc4296a-5baa-4850-9ddb-6989f1df1f15',
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
  .put('/kv/.appconfig.featureflag%2Fname-1161736249956207002', {"key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"YOzTU1fuA9vA5EBTNPsM1sKe0DA","key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:40+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'ETag',
  '"YOzTU1fuA9vA5EBTNPsM1sKe0DA"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjE=;sn=3036061',
  'x-ms-request-id',
  '0cf64fa0-67a2-4300-bfc3-321fd139b693',
  'x-ms-correlation-request-id',
  '0cf64fa0-67a2-4300-bfc3-321fd139b693',
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
  .put('/kv/.appconfig.featureflag%2Fname-1161736249956207002-2', {"key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm new description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"etag":"h7SXoBgaTaRLWZ7bvuIbwcl5OcZ"})
  .query(true)
  .reply(200, {"etag":"no786ahiSoamdZXNcws7U5ttPOc","key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm new description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:40+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'ETag',
  '"no786ahiSoamdZXNcws7U5ttPOc"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjI=;sn=3036062',
  'x-ms-request-id',
  'e695682e-dd93-49cf-812d-ab5cdef12c54',
  'x-ms-correlation-request-id',
  'e695682e-dd93-49cf-812d-ab5cdef12c54',
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
  .reply(200, {"items":[{"etag":"YOzTU1fuA9vA5EBTNPsM1sKe0DA","key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:40+00:00"},{"etag":"no786ahiSoamdZXNcws7U5ttPOc","key":".appconfig.featureflag/name-1161736249956207002-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002-2\",\"description\":\"I'm new description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:40+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjI=;sn=3036062',
  'x-ms-request-id',
  '8ca384a5-c490-4e69-a145-712d63f403e1',
  'x-ms-correlation-request-id',
  '8ca384a5-c490-4e69-a145-712d63f403e1',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161736249956207002-2')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '54c5dc4c-4e3e-45e8-9db0-4f4113906bad',
  'x-ms-correlation-request-id',
  '54c5dc4c-4e3e-45e8-9db0-4f4113906bad',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161736249956207002')
  .query(true)
  .reply(200, {"etag":"YOzTU1fuA9vA5EBTNPsM1sKe0DA","key":".appconfig.featureflag/name-1161736249956207002","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249956207002\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:40+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:40 GMT',
  'ETag',
  '"YOzTU1fuA9vA5EBTNPsM1sKe0DA"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNjM=;sn=3036063',
  'x-ms-request-id',
  '77b1a36f-1ad3-4ad7-b18d-f613b2fa6df4',
  'x-ms-correlation-request-id',
  '77b1a36f-1ad3-4ad7-b18d-f613b2fa6df4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
