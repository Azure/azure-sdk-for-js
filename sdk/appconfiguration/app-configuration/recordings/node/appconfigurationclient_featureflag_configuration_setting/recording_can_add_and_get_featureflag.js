let nock = require('nock');

module.exports.hash = "0f3d1c1e4498c8bfdfe2a40257d26862";

module.exports.testInfo = {"uniqueName":{"name-1":"name-1161727072887004268"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/.appconfig.featureflag%2Fname-1161727072887004268', {"key":".appconfig.featureflag/name-1161727072887004268","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072887004268\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}"})
  .query(true)
  .reply(200, {"etag":"S9DTi4yqIqKbprknPA6rQfErwVn","key":".appconfig.featureflag/name-1161727072887004268","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072887004268\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:09+00:00"}, [
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
  'Thu, 01 Apr 2021 09:52:09 GMT',
  'ETag',
  '"S9DTi4yqIqKbprknPA6rQfErwVn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Njg=;sn=3030668',
  'x-ms-request-id',
  'f3f8fabb-f338-48e1-bb79-1f063151cb7c',
  'x-ms-correlation-request-id',
  'f3f8fabb-f338-48e1-bb79-1f063151cb7c',
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
  .get('/kv/.appconfig.featureflag%2Fname-1161727072887004268')
  .query(true)
  .reply(200, {"etag":"S9DTi4yqIqKbprknPA6rQfErwVn","key":".appconfig.featureflag/name-1161727072887004268","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072887004268\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:09+00:00"}, [
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
  'Thu, 01 Apr 2021 09:52:09 GMT',
  'ETag',
  '"S9DTi4yqIqKbprknPA6rQfErwVn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Njg=;sn=3030668',
  'x-ms-request-id',
  '6063d6ea-9721-4d43-816a-75a013f02244',
  'x-ms-correlation-request-id',
  '6063d6ea-9721-4d43-816a-75a013f02244',
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
  .delete('/kv/.appconfig.featureflag%2Fname-1161727072887004268')
  .query(true)
  .reply(200, {"etag":"S9DTi4yqIqKbprknPA6rQfErwVn","key":".appconfig.featureflag/name-1161727072887004268","label":"label-1","content_type":"application/vnd.microsoft.appconfig.ff+json;charset=utf-8","value":"{\"id\":\"name-1161727072887004268\",\"description\":\"I'm a description\",\"enabled\":false,\"conditions\":{\"client_filters\":[{\"name\":\"Microsoft.TimeWindow\",\"parameters\":{\"Start\":\"Wed, 01 May 2019 13:59:59 GMT\",\"End\":\"Mon, 01 July 2019 00:00:00 GMT\"}},{\"name\":\"FilterX\"},{\"name\":\"Microsoft.Targeting\",\"parameters\":{\"Audience\":{\"Groups\":[{\"Name\":\"group-1\",\"RolloutPercentage\":25},{\"Name\":\"group-2\",\"RolloutPercentage\":45}],\"Users\":[\"userA\",\"userB\"],\"DefaultRolloutPercentage\":40}}},{\"name\":\"Microsoft.Percentage\",\"parameters\":{\"Value\":25}}]}}","tags":{},"locked":false,"last_modified":"2021-04-01T09:52:09+00:00"}, [
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
  'Thu, 01 Apr 2021 09:52:09 GMT',
  'ETag',
  '"S9DTi4yqIqKbprknPA6rQfErwVn"',
  'Sync-Token',
  'zAJw6V16=NTo1IzMwMzA2Njk=;sn=3030669',
  'x-ms-request-id',
  'ce339958-523a-4bb9-ac99-6018d09f02f4',
  'x-ms-correlation-request-id',
  'ce339958-523a-4bb9-ac99-6018d09f02f4',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
