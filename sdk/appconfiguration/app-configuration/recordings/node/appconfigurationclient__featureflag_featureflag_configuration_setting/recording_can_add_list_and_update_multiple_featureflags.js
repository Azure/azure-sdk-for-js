let nock = require('nock');

module.exports.hash = "45aafb0f8e61428424793462e80c7b16";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1162093807970106147"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1162093807970106147', {"key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"FjdDUE9y4oTuQPd3RUqdwZljQZR","key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:39+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:39 GMT',
  'ETag',
  '"FjdDUE9y4oTuQPd3RUqdwZljQZR"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzg5;sn=3267789',
  'x-ms-request-id',
  'bd8208a2-e79e-4e29-ac35-4bf7380e066c',
  'x-ms-correlation-request-id',
  'bd8208a2-e79e-4e29-ac35-4bf7380e066c',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162093807970106147-2', {"key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"fpDzhF64VqBdFzuOotplaqyrykM","key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:40+00:00"}, [
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
  'Thu, 13 May 2021 20:34:40 GMT',
  'ETag',
  '"fpDzhF64VqBdFzuOotplaqyrykM"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzkw;sn=3267790',
  'x-ms-request-id',
  '92f17633-062c-48c0-b527-8eb42c269992',
  'x-ms-correlation-request-id',
  '92f17633-062c-48c0-b527-8eb42c269992',
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
  .reply(200, {"items":[{"etag":"FjdDUE9y4oTuQPd3RUqdwZljQZR","key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:39+00:00"},{"etag":"fpDzhF64VqBdFzuOotplaqyrykM","key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:40+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzkw;sn=3267790',
  'x-ms-request-id',
  'b4654a29-ecd5-4958-a80f-ec26382a9644',
  'x-ms-correlation-request-id',
  'b4654a29-ecd5-4958-a80f-ec26382a9644',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162093807970106147', {"key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}"})
  .query(true)
  .reply(200, {"etag":"7C2MG2EqNShaYOdAHhCqTlnt2Tl","key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:40+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:40 GMT',
  'ETag',
  '"7C2MG2EqNShaYOdAHhCqTlnt2Tl"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzkx;sn=3267791',
  'x-ms-request-id',
  '1e877381-6076-4c5a-92d5-6c4e743baa3c',
  'x-ms-correlation-request-id',
  '1e877381-6076-4c5a-92d5-6c4e743baa3c',
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
  .put('/kv/.appconfig.featureflag%2Fname-1162093807970106147-2', {"key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm new description\"}","last_modified":"2021-05-13T20:34:40.000Z","tags":{},"etag":"fpDzhF64VqBdFzuOotplaqyrykM"})
  .query(true)
  .reply(200, {"etag":"bDN5FoT9E7rSjZp9XRKkR0dvPuB","key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm new description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:41+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 13 May 2021 20:34:41 GMT',
  'ETag',
  '"bDN5FoT9E7rSjZp9XRKkR0dvPuB"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzky;sn=3267792',
  'x-ms-request-id',
  '2150b0d3-b572-4a48-8cfa-3cca19adc9e4',
  'x-ms-correlation-request-id',
  '2150b0d3-b572-4a48-8cfa-3cca19adc9e4',
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
  .reply(200, {"items":[{"etag":"7C2MG2EqNShaYOdAHhCqTlnt2Tl","key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:40+00:00"},{"etag":"bDN5FoT9E7rSjZp9XRKkR0dvPuB","key":".appconfig.featureflag/name-1162093807970106147-2","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147-2\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":false,\"description\":\"I'm new description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:41+00:00"}]}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzky;sn=3267792',
  'x-ms-request-id',
  'e4f97272-ced0-4990-b0f7-2ba8ed090c86',
  'x-ms-correlation-request-id',
  'e4f97272-ced0-4990-b0f7-2ba8ed090c86',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162093807970106147-2')
  .query(true)
  .reply(204, "", [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Thu, 13 May 2021 20:34:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Connection',
  'close',
  'x-ms-request-id',
  '0fb1b1d0-bd10-414f-b0aa-8a3951c228c7',
  'x-ms-correlation-request-id',
  '0fb1b1d0-bd10-414f-b0aa-8a3951c228c7',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1162093807970106147')
  .query(true)
  .reply(200, {"etag":"7C2MG2EqNShaYOdAHhCqTlnt2Tl","key":".appconfig.featureflag/name-1162093807970106147","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1162093807970106147\",\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"end\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"audience\":{\"groups\":[{\"name\":\"group-1\",\"rolloutPercentage\":25},{\"name\":\"group-2\",\"rolloutPercentage\":45}],\"users\":[\"userA\",\"userB\"],\"defaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"value\":25}}]},\"enabled\":true,\"description\":\"I'm a description\"}","tags":{},"locked":false,"last_modified":"2021-05-13T20:34:40+00:00"}, [
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
  'Thu, 13 May 2021 20:34:40 GMT',
  'ETag',
  '"7C2MG2EqNShaYOdAHhCqTlnt2Tl"',
  'Sync-Token',
  'zAJw6V16=NToxOSMzMjY3Nzkz;sn=3267793',
  'x-ms-request-id',
  'abf1d089-c2d6-4b70-b38a-d7de41182873',
  'x-ms-correlation-request-id',
  'abf1d089-c2d6-4b70-b38a-d7de41182873',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
