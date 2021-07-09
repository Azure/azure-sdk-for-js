let nock = require('nock');

module.exports.hash = "6c38ae75a4edff790bfbb19ef7ba2a54";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162439656800608347"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162439656800608347', {"key":".appconfig.featureflag/name-1162439656800608347","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656800608347\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}"})
  .query(true)
  .reply(200, {"etag":"oRPly66ZLIYi5tEIq1CVgWDCQdj","key":".appconfig.featureflag/name-1162439656800608347","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656800608347\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:07+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:02 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:07 GMT',
  'ETag',
  '"oRPly66ZLIYi5tEIq1CVgWDCQdj"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY1;sn=3592365',
  'x-ms-request-id',
  '846cb29a-90f7-40ac-9fe8-ebd117e10537',
  'x-ms-correlation-request-id',
  '846cb29a-90f7-40ac-9fe8-ebd117e10537',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162439656800608347')
  .query(true)
  .reply(200, {"etag":"oRPly66ZLIYi5tEIq1CVgWDCQdj","key":".appconfig.featureflag/name-1162439656800608347","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656800608347\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:07+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:08 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:07 GMT',
  'ETag',
  '"oRPly66ZLIYi5tEIq1CVgWDCQdj"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY1;sn=3592365',
  'x-ms-request-id',
  '928981b6-7027-4cbd-b01c-019333bcf6f8',
  'x-ms-correlation-request-id',
  '928981b6-7027-4cbd-b01c-019333bcf6f8',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439656800608347')
  .query(true)
  .reply(200, {"etag":"oRPly66ZLIYi5tEIq1CVgWDCQdj","key":".appconfig.featureflag/name-1162439656800608347","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656800608347\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:07+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:03 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:07 GMT',
  'ETag',
  '"oRPly66ZLIYi5tEIq1CVgWDCQdj"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY2;sn=3592366',
  'x-ms-request-id',
  'd9085d47-0266-427e-bd1d-3ec8e9126882',
  'x-ms-correlation-request-id',
  'd9085d47-0266-427e-bd1d-3ec8e9126882',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
