let nock = require('nock');

module.exports.hash = "3c8d196cecc4465637a5e1cf232b3075";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1161736249818502403"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1161736249818502403', {"key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"8we5v58XC63IpZHp58O2eL3jOju","key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'ETag',
  '"8we5v58XC63IpZHp58O2eL3jOju"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTY=;sn=3036056',
  'x-ms-request-id',
  'd53850c6-cf46-4324-8646-82f218463eae',
  'x-ms-correlation-request-id',
  'd53850c6-cf46-4324-8646-82f218463eae',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161736249818502403')
  .query(true)
  .reply(200, {"etag":"8we5v58XC63IpZHp58O2eL3jOju","key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'ETag',
  '"8we5v58XC63IpZHp58O2eL3jOju"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTY=;sn=3036056',
  'x-ms-request-id',
  '98015151-7f1e-478f-bc74-52f8405b2d31',
  'x-ms-correlation-request-id',
  '98015151-7f1e-478f-bc74-52f8405b2d31',
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
  .put('/kv/.appconfig.featureflag%2Fname-1161736249818502403', {"key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"etag":"8we5v58XC63IpZHp58O2eL3jOju"})
  .query(true)
  .reply(200, {"etag":"Ku6xNQEd3zTg0wSuhj3gmz1e72i","key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'ETag',
  '"Ku6xNQEd3zTg0wSuhj3gmz1e72i"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTc=;sn=3036057',
  'x-ms-request-id',
  'a455a51b-61a3-4a26-a651-a9228e299c30',
  'x-ms-correlation-request-id',
  'a455a51b-61a3-4a26-a651-a9228e299c30',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161736249818502403')
  .query(true)
  .reply(200, {"etag":"Ku6xNQEd3zTg0wSuhj3gmz1e72i","key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:38+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'ETag',
  '"Ku6xNQEd3zTg0wSuhj3gmz1e72i"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTc=;sn=3036057',
  'x-ms-request-id',
  '191f5a74-27a8-4bdf-828a-494cdcaf7513',
  'x-ms-correlation-request-id',
  '191f5a74-27a8-4bdf-828a-494cdcaf7513',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161736249818502403')
  .query(true)
  .reply(200, {"etag":"Ku6xNQEd3zTg0wSuhj3gmz1e72i","key":".appconfig.featureflag/name-1161736249818502403","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249818502403\",\"description\":\"I'm a description\",\"enabled\":true,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:38+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 02 Apr 2021 11:21:38 GMT',
  'ETag',
  '"Ku6xNQEd3zTg0wSuhj3gmz1e72i"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTg=;sn=3036058',
  'x-ms-request-id',
  '631dd3e8-1d08-45fc-9ede-660491627951',
  'x-ms-correlation-request-id',
  '631dd3e8-1d08-45fc-9ede-660491627951',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
