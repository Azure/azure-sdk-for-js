let nock = require('nock');

module.exports.hash = "8a7ebb1c70ead2328af210caaa10a4f3";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162439657053408694"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162439657053408694', {"key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}"})
  .query(true)
  .reply(200, {"etag":"0Rq9X7UiykkkiGEBZ6MnQsC4uqy","key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:05 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:10 GMT',
  'ETag',
  '"0Rq9X7UiykkkiGEBZ6MnQsC4uqy"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcw;sn=3592370',
  'x-ms-request-id',
  'cee508d1-5179-4b52-a0c5-b7b6b448683a',
  'x-ms-correlation-request-id',
  'cee508d1-5179-4b52-a0c5-b7b6b448683a',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162439657053408694-2', {"key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}"})
  .query(true)
  .reply(200, {"etag":"e95RJbg1kGLdRFK9WnqlmR3pWvO","key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:10 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:10 GMT',
  'ETag',
  '"e95RJbg1kGLdRFK9WnqlmR3pWvO"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcx;sn=3592371',
  'x-ms-request-id',
  '832396a3-caf2-4ddb-a2c5-9853ee7cf055',
  'x-ms-correlation-request-id',
  '832396a3-caf2-4ddb-a2c5-9853ee7cf055',
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
  .reply(200, {"items":[{"etag":"0Rq9X7UiykkkiGEBZ6MnQsC4uqy","key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"},{"etag":"e95RJbg1kGLdRFK9WnqlmR3pWvO","key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:05 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcx;sn=3592371',
  'x-ms-request-id',
  '29c7d55a-f19c-4d5e-b7cb-7a8ccde4ea05',
  'x-ms-correlation-request-id',
  '29c7d55a-f19c-4d5e-b7cb-7a8ccde4ea05',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162439657053408694', {"key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}"})
  .query(true)
  .reply(200, {"etag":"urU9HOvqs8b9iuW3HSywWe8fRw0","key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:11 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:10 GMT',
  'ETag',
  '"urU9HOvqs8b9iuW3HSywWe8fRw0"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcy;sn=3592372',
  'x-ms-request-id',
  '19384e76-c7c6-40ed-8647-095fe6778e69',
  'x-ms-correlation-request-id',
  '19384e76-c7c6-40ed-8647-095fe6778e69',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162439657053408694-2', {"key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm new description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","last_modified":"2021-06-22T21:16:10.000Z","tags":{},"etag":"e95RJbg1kGLdRFK9WnqlmR3pWvO"})
  .query(true)
  .reply(200, {"etag":"jjyq0kuwFADqozpVbbtVzD6F72f","key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm new description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:11+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:11 GMT',
  'ETag',
  '"jjyq0kuwFADqozpVbbtVzD6F72f"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcz;sn=3592373',
  'x-ms-request-id',
  '66bbaf91-3f0b-4945-b46b-9df8292a764b',
  'x-ms-correlation-request-id',
  '66bbaf91-3f0b-4945-b46b-9df8292a764b',
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
  .reply(200, {"items":[{"etag":"urU9HOvqs8b9iuW3HSywWe8fRw0","key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"},{"etag":"jjyq0kuwFADqozpVbbtVzD6F72f","key":".appconfig.featureflag/name-1162439657053408694-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694-2\",\"enabled\":false,\"description\":\"I'm new description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:11+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:11 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzcz;sn=3592373',
  'x-ms-request-id',
  '932f6efa-0948-4513-9acd-b9bfe565dd02',
  'x-ms-correlation-request-id',
  '932f6efa-0948-4513-9acd-b9bfe565dd02',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439657053408694-2')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:06 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  'd53a8e77-8887-4a40-87c9-2b5f889f4dca',
  'x-ms-correlation-request-id',
  'd53a8e77-8887-4a40-87c9-2b5f889f4dca',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439657053408694')
  .query(true)
  .reply(200, {"etag":"urU9HOvqs8b9iuW3HSywWe8fRw0","key":".appconfig.featureflag/name-1162439657053408694","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439657053408694\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:10+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:12 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:10 GMT',
  'ETag',
  '"urU9HOvqs8b9iuW3HSywWe8fRw0"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzc0;sn=3592374',
  'x-ms-request-id',
  'e47b8e8c-5863-4fee-b923-57da6eb7246e',
  'x-ms-correlation-request-id',
  'e47b8e8c-5863-4fee-b923-57da6eb7246e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
