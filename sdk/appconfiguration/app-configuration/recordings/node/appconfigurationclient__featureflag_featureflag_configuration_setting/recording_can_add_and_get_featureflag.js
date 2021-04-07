let nock = require('nock');

module.exports.hash = "0f3d1c1e4498c8bfdfe2a40257d26862";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1161736249716600236"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1161736249716600236', {"key":".appconfig.featureflag/name-1161736249716600236","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249716600236\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"L715LplZhnVkTcair5pIUmLYbrb","key":".appconfig.featureflag/name-1161736249716600236","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249716600236\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:37+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:37 GMT',
  'ETag',
  '"L715LplZhnVkTcair5pIUmLYbrb"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTQ=;sn=3036054',
  'x-ms-request-id',
  '532e0b89-15a8-401d-8cb3-15b407a102f7',
  'x-ms-correlation-request-id',
  '532e0b89-15a8-401d-8cb3-15b407a102f7',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161736249716600236')
  .query(true)
  .reply(200, {"etag":"L715LplZhnVkTcair5pIUmLYbrb","key":".appconfig.featureflag/name-1161736249716600236","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249716600236\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:37+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:37 GMT',
  'ETag',
  '"L715LplZhnVkTcair5pIUmLYbrb"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTQ=;sn=3036054',
  'x-ms-request-id',
  'cb0ff52f-e454-49b4-9cb5-48bd8d0336c0',
  'x-ms-correlation-request-id',
  'cb0ff52f-e454-49b4-9cb5-48bd8d0336c0',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161736249716600236')
  .query(true)
  .reply(200, {"etag":"L715LplZhnVkTcair5pIUmLYbrb","key":".appconfig.featureflag/name-1161736249716600236","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161736249716600236\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-02T11:21:37+00:00"}, [
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
  'Fri, 02 Apr 2021 11:21:37 GMT',
  'ETag',
  '"L715LplZhnVkTcair5pIUmLYbrb"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzYwNTU=;sn=3036055',
  'x-ms-request-id',
  '202dd25d-3be6-4b00-acd4-68bd4483d710',
  'x-ms-correlation-request-id',
  '202dd25d-3be6-4b00-acd4-68bd4483d710',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
