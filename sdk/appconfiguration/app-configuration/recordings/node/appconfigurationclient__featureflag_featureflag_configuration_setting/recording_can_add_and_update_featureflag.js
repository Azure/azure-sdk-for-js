let nock = require('nock');

module.exports.hash = "13ad4b67ef115e4c7dc2376c7b861525";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162439656917004795"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162439656917004795', {"key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}"})
  .query(true)
  .reply(200, {"etag":"tb0PGX9cqktFAvENcBfNYXqN4Qs","key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:08+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:09 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:08 GMT',
  'ETag',
  '"tb0PGX9cqktFAvENcBfNYXqN4Qs"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY3;sn=3592367',
  'x-ms-request-id',
  '94198b67-8596-488c-838f-cccf2a7cc979',
  'x-ms-correlation-request-id',
  '94198b67-8596-488c-838f-cccf2a7cc979',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162439656917004795')
  .query(true)
  .reply(200, {"etag":"tb0PGX9cqktFAvENcBfNYXqN4Qs","key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":false,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:08+00:00"}, [
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
  'Tue, 22 Jun 2021 21:16:08 GMT',
  'ETag',
  '"tb0PGX9cqktFAvENcBfNYXqN4Qs"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY3;sn=3592367',
  'x-ms-request-id',
  '681bd4de-a950-435a-b50a-11453970a8cb',
  'x-ms-correlation-request-id',
  '681bd4de-a950-435a-b50a-11453970a8cb',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162439656917004795', {"key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","last_modified":"2021-06-22T21:16:08.000Z","tags":{},"etag":"tb0PGX9cqktFAvENcBfNYXqN4Qs"})
  .query(true)
  .reply(200, {"etag":"S0zm5XXS5iyEN5FFVFpsPM58bKA","key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:09 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:09 GMT',
  'ETag',
  '"S0zm5XXS5iyEN5FFVFpsPM58bKA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY4;sn=3592368',
  'x-ms-request-id',
  'c305062d-3b77-4144-a1ef-9abfe1c7eb6e',
  'x-ms-correlation-request-id',
  'c305062d-3b77-4144-a1ef-9abfe1c7eb6e',
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
  .get('/kv/.appconfig.featureflag%2Fname-1162439656917004795')
  .query(true)
  .reply(200, {"etag":"S0zm5XXS5iyEN5FFVFpsPM58bKA","key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:09+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Tue, 22 Jun 2021 21:16:04 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Tue, 22 Jun 2021 21:16:09 GMT',
  'ETag',
  '"S0zm5XXS5iyEN5FFVFpsPM58bKA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY4;sn=3592368',
  'x-ms-request-id',
  'ecef2ff7-c0fa-4689-a022-89e74829d4a7',
  'x-ms-correlation-request-id',
  'ecef2ff7-c0fa-4689-a022-89e74829d4a7',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162439656917004795')
  .query(true)
  .reply(200, {"etag":"S0zm5XXS5iyEN5FFVFpsPM58bKA","key":".appconfig.featureflag/name-1162439656917004795","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162439656917004795\",\"enabled\":true,\"description\":\"I'm a description\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]},\"display_name\":\"for display\"}","tags":{},"locked":false,"last_modified":"2021-06-22T21:16:09+00:00"}, [
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
  'Tue, 22 Jun 2021 21:16:09 GMT',
  'ETag',
  '"S0zm5XXS5iyEN5FFVFpsPM58bKA"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzNTkyMzY5;sn=3592369',
  'x-ms-request-id',
  '8c217a3e-5574-455d-a17f-198cac230693',
  'x-ms-correlation-request-id',
  '8c217a3e-5574-455d-a17f-198cac230693',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
