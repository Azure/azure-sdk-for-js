let nock = require('nock');

module.exports.hash = "7a13a128a290c5e391e72b4bdb9f113d";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162095387519409135"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162095387519409135', {"key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"7xf0x83wqhvINQvzFm9eDZSRha3","key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-14T00:57:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 14 May 2021 00:57:52 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 14 May 2021 00:57:55 GMT',
  'ETag',
  '"7xf0x83wqhvINQvzFm9eDZSRha3"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY5Nzk0;sn=3269794',
  'x-ms-request-id',
  '6af288a7-20ce-4d03-beeb-388bd1a3164d',
  'x-ms-correlation-request-id',
  '6af288a7-20ce-4d03-beeb-388bd1a3164d',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162095387519409135')
  .query(true)
  .reply(200, {"etag":"7xf0x83wqhvINQvzFm9eDZSRha3","key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-14T00:57:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 14 May 2021 00:57:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 14 May 2021 00:57:55 GMT',
  'ETag',
  '"7xf0x83wqhvINQvzFm9eDZSRha3"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY5Nzk0;sn=3269794',
  'x-ms-request-id',
  'c63dea91-3fc7-4282-a303-8971db9f2f79',
  'x-ms-correlation-request-id',
  'c63dea91-3fc7-4282-a303-8971db9f2f79',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162095387519409135', {"key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","last_modified":"2021-05-14T00:57:55.000Z","tags":{},"etag":"7xf0x83wqhvINQvzFm9eDZSRha3"})
  .query(true)
  .reply(200, {"etag":"yiKlYOQLIzpGawI9jJqu7D0c7wJ","key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-14T00:57:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 14 May 2021 00:57:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 14 May 2021 00:57:55 GMT',
  'ETag',
  '"yiKlYOQLIzpGawI9jJqu7D0c7wJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY5Nzk1;sn=3269795',
  'x-ms-request-id',
  '403eb3de-9740-4c48-95f2-d6607873c437',
  'x-ms-correlation-request-id',
  '403eb3de-9740-4c48-95f2-d6607873c437',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162095387519409135')
  .query(true)
  .reply(200, {"etag":"yiKlYOQLIzpGawI9jJqu7D0c7wJ","key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-14T00:57:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 14 May 2021 00:57:54 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 14 May 2021 00:57:55 GMT',
  'ETag',
  '"yiKlYOQLIzpGawI9jJqu7D0c7wJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY5Nzk1;sn=3269795',
  'x-ms-request-id',
  '37e3265a-18ab-41d1-a32c-9459b0a27ff0',
  'x-ms-correlation-request-id',
  '37e3265a-18ab-41d1-a32c-9459b0a27ff0',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162095387519409135')
  .query(true)
  .reply(200, {"etag":"yiKlYOQLIzpGawI9jJqu7D0c7wJ","key":".appconfig.featureflag/name-1162095387519409135","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162095387519409135\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-14T00:57:55+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Fri, 14 May 2021 00:57:53 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Fri, 14 May 2021 00:57:55 GMT',
  'ETag',
  '"yiKlYOQLIzpGawI9jJqu7D0c7wJ"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY5Nzk2;sn=3269796',
  'x-ms-request-id',
  '9e9df427-13dd-4414-85f4-893a8a0546ec',
  'x-ms-correlation-request-id',
  '9e9df427-13dd-4414-85f4-893a8a0546ec',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
