let nock = require('nock');

module.exports.hash = "cf062496113ac7c88805c0623ce05e91";

module.exports.testInfo = {"uniqueName":{"etags":"etags158700189521304789"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158700189521304789', {"key":"etags158700189521304789","value":"some value"})
  .query(true)
  .reply(200, {"etag":"esjISYt89Gu4CxgVrdDmZFHoYqq","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"esjISYt89Gu4CxgVrdDmZFHoYqq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE3;sn=1904817',
  'x-ms-request-id',
  '1acbdc4d-1fe3-4a75-848b-fe94c59e0d03',
  'x-ms-correlation-request-id',
  '1acbdc4d-1fe3-4a75-848b-fe94c59e0d03',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"esjISYt89Gu4CxgVrdDmZFHoYqq","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"esjISYt89Gu4CxgVrdDmZFHoYqq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE3;sn=1904817',
  'x-ms-request-id',
  '14f33daa-9148-4546-9dbb-e25e3336c1c7',
  'x-ms-correlation-request-id',
  '14f33daa-9148-4546-9dbb-e25e3336c1c7',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/etags158700189521304789')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '7c4663f9-0a81-49e4-b932-7eaa7fd10707',
  'x-ms-correlation-request-id',
  '7c4663f9-0a81-49e4-b932-7eaa7fd10707',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"esjISYt89Gu4CxgVrdDmZFHoYqq","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:35+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'ETag',
  '"esjISYt89Gu4CxgVrdDmZFHoYqq"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE3;sn=1904817',
  'x-ms-request-id',
  '247c038c-9309-439d-baf7-2dfcc863a9bf',
  'x-ms-correlation-request-id',
  '247c038c-9309-439d-baf7-2dfcc863a9bf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/locks/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"WjWzaj1QsroXrOtySXuycR60ZcC","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"WjWzaj1QsroXrOtySXuycR60ZcC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE4;sn=1904818',
  'x-ms-request-id',
  'e78a282e-5f70-4202-8739-3237e210d949',
  'x-ms-correlation-request-id',
  'e78a282e-5f70-4202-8739-3237e210d949',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"WjWzaj1QsroXrOtySXuycR60ZcC","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"WjWzaj1QsroXrOtySXuycR60ZcC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE4;sn=1904818',
  'x-ms-request-id',
  '295971c0-f4d5-4ffe-9c43-15cf4c15d8e8',
  'x-ms-correlation-request-id',
  '295971c0-f4d5-4ffe-9c43-15cf4c15d8e8',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/locks/etags158700189521304789')
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:35 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  '849fd5a6-2656-45b4-9eae-b413a51b4ac0',
  'x-ms-correlation-request-id',
  '849fd5a6-2656-45b4-9eae-b413a51b4ac0',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"WjWzaj1QsroXrOtySXuycR60ZcC","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":true,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"WjWzaj1QsroXrOtySXuycR60ZcC"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE4;sn=1904818',
  'x-ms-request-id',
  '19847585-c534-4d3a-b095-a18bbb33f7e8',
  'x-ms-correlation-request-id',
  '19847585-c534-4d3a-b095-a18bbb33f7e8',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/locks/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"VVe4UI3VsFWKy8tQC4MRFbQi4xm","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"VVe4UI3VsFWKy8tQC4MRFbQi4xm"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE5;sn=1904819',
  'x-ms-request-id',
  'a481bc3b-db35-4dd0-adde-71ff8c0781c5',
  'x-ms-correlation-request-id',
  'a481bc3b-db35-4dd0-adde-71ff8c0781c5',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"VVe4UI3VsFWKy8tQC4MRFbQi4xm","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"VVe4UI3VsFWKy8tQC4MRFbQi4xm"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE5;sn=1904819',
  'x-ms-request-id',
  '6d5bd4a8-ab10-46f5-9a99-8b4efda79795',
  'x-ms-correlation-request-id',
  '6d5bd4a8-ab10-46f5-9a99-8b4efda79795',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/kv')
  .query(true)
  .reply(200, {"items":[{"etag":"VVe4UI3VsFWKy8tQC4MRFbQi4xm","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:36+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODE5;sn=1904819',
  'x-ms-request-id',
  'd5691e32-77ef-4464-b157-eb715a7e10bf',
  'x-ms-correlation-request-id',
  'd5691e32-77ef-4464-b157-eb715a7e10bf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .delete('/kv/etags158700189521304789')
  .query(true)
  .reply(200, {"etag":"VVe4UI3VsFWKy8tQC4MRFbQi4xm","key":"etags158700189521304789","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-16T01:51:36+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:51:36 GMT',
  'ETag',
  '"VVe4UI3VsFWKy8tQC4MRFbQi4xm"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODIw;sn=1904820',
  'x-ms-request-id',
  '09a16d83-bb0d-4406-bcce-ed44559ab486',
  'x-ms-correlation-request-id',
  '09a16d83-bb0d-4406-bcce-ed44559ab486',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
