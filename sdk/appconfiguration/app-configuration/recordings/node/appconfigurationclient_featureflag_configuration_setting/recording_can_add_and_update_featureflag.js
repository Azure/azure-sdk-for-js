let nock = require('nock');

module.exports.hash = "3c8d196cecc4465637a5e1cf232b3075";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1161727072987507081"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1161727072987507081', {"key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"t3LlroJSiLKU6eJF0loGvYQM98U","key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:09 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'ETag',
  '"t3LlroJSiLKU6eJF0loGvYQM98U"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2NzA=;sn=3030670',
  'x-ms-request-id',
  'c56708a9-7755-4187-886b-67ebb6216be4',
  'x-ms-correlation-request-id',
  'c56708a9-7755-4187-886b-67ebb6216be4',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161727072987507081')
  .query(true)
  .reply(200, {"etag":"t3LlroJSiLKU6eJF0loGvYQM98U","key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'ETag',
  '"t3LlroJSiLKU6eJF0loGvYQM98U"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2NzA=;sn=3030670',
  'x-ms-request-id',
  'faacf86e-42c8-48a0-8b19-e8a65a3a9603',
  'x-ms-correlation-request-id',
  'faacf86e-42c8-48a0-8b19-e8a65a3a9603',
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
  .put('/kv/.appconfig.featureflag%2Fname-1161727072987507081', {"key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"etag":"t3LlroJSiLKU6eJF0loGvYQM98U"})
  .query(true)
  .reply(200, {"etag":"sAsbLlwHYvXpVKkdbOHp51DAyGn","key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'ETag',
  '"sAsbLlwHYvXpVKkdbOHp51DAyGn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2NzE=;sn=3030671',
  'x-ms-request-id',
  '80da7901-1e8a-4668-a3dd-1f3062517871',
  'x-ms-correlation-request-id',
  '80da7901-1e8a-4668-a3dd-1f3062517871',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161727072987507081')
  .query(true)
  .reply(200, {"etag":"sAsbLlwHYvXpVKkdbOHp51DAyGn","key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:11 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'ETag',
  '"sAsbLlwHYvXpVKkdbOHp51DAyGn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2NzE=;sn=3030671',
  'x-ms-request-id',
  '1b619093-0e02-49fb-bc32-f18431ea8461',
  'x-ms-correlation-request-id',
  '1b619093-0e02-49fb-bc32-f18431ea8461',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161727072987507081')
  .query(true)
  .reply(200, {"etag":"sAsbLlwHYvXpVKkdbOHp51DAyGn","key":".appconfig.featureflag/name-1161727072987507081","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072987507081\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 01 Apr 2021 09:52:10 GMT',
  'ETag',
  '"sAsbLlwHYvXpVKkdbOHp51DAyGn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2NzI=;sn=3030672',
  'x-ms-request-id',
  'a7882374-6acb-429b-b266-3b28be239d99',
  'x-ms-correlation-request-id',
  'a7882374-6acb-429b-b266-3b28be239d99',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
