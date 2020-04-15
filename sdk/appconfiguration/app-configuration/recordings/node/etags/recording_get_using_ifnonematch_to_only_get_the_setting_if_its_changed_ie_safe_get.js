let nock = require('nock');

module.exports.hash = "d135bc8449ec64c99f6f48bde90627dd";

module.exports.testInfo = {"uniqueName":{"etags":"etags158696680219207278"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158696680219207278', {"key":"etags158696680219207278","value":"some value"})
  .query(true)
  .reply(200, {"etag":"J3W2m2643svwU7mGdMEIDJKdS6I","key":"etags158696680219207278","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"J3W2m2643svwU7mGdMEIDJKdS6I"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE2;sn=1902316',
  'x-ms-request-id',
  '0c5926c4-7328-4444-b96b-554766f946fb',
  'x-ms-correlation-request-id',
  '0c5926c4-7328-4444-b96b-554766f946fb',
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
  .put('/kv/etags158696680219207278', {"key":"etags158696680219207278","value":"world"})
  .query(true)
  .reply(200, {"etag":"O1YxFEr6hOT5Dujug5GW60DPXLv","key":"etags158696680219207278","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:42+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'ETag',
  '"O1YxFEr6hOT5Dujug5GW60DPXLv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE3;sn=1902317',
  'x-ms-request-id',
  '123bbc81-5208-440a-9828-8a733fcb965a',
  'x-ms-correlation-request-id',
  '123bbc81-5208-440a-9828-8a733fcb965a',
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
  .get('/kv/etags158696680219207278')
  .query(true)
  .reply(304, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Connection',
  'close',
  'ETag',
  '"O1YxFEr6hOT5Dujug5GW60DPXLv"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE3;sn=1902317',
  'x-ms-request-id',
  'c9b3d715-c190-46c1-bb79-148b216e8532',
  'x-ms-correlation-request-id',
  'c9b3d715-c190-46c1-bb79-148b216e8532',
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
  .put('/kv/etags158696680219207278', {"key":"etags158696680219207278","value":"new world"})
  .query(true)
  .reply(200, {"etag":"eAExSFDcA2DBSUdDAVpqwWHDlWk","key":"etags158696680219207278","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"eAExSFDcA2DBSUdDAVpqwWHDlWk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE4;sn=1902318',
  'x-ms-request-id',
  '23f5f10b-6949-4791-88f5-0a45d5a1e41e',
  'x-ms-correlation-request-id',
  '23f5f10b-6949-4791-88f5-0a45d5a1e41e',
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
  .get('/kv/etags158696680219207278')
  .query(true)
  .reply(200, {"etag":"eAExSFDcA2DBSUdDAVpqwWHDlWk","key":"etags158696680219207278","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"eAExSFDcA2DBSUdDAVpqwWHDlWk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE4;sn=1902318',
  'x-ms-request-id',
  'e38558b9-d09d-4cb4-aa16-76f667c4824c',
  'x-ms-correlation-request-id',
  'e38558b9-d09d-4cb4-aa16-76f667c4824c',
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
  .get('/kv/etags158696680219207278')
  .query(true)
  .reply(200, {"etag":"eAExSFDcA2DBSUdDAVpqwWHDlWk","key":"etags158696680219207278","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"eAExSFDcA2DBSUdDAVpqwWHDlWk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE4;sn=1902318',
  'x-ms-request-id',
  'c658dac6-144b-4f91-adef-d9bd38e117a4',
  'x-ms-correlation-request-id',
  'c658dac6-144b-4f91-adef-d9bd38e117a4',
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
  .reply(200, {"items":[{"etag":"eAExSFDcA2DBSUdDAVpqwWHDlWk","key":"etags158696680219207278","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:42 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE4;sn=1902318',
  'x-ms-request-id',
  '75666b90-6e76-4c07-a99e-313d45bc4dfb',
  'x-ms-correlation-request-id',
  '75666b90-6e76-4c07-a99e-313d45bc4dfb',
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
  .delete('/kv/etags158696680219207278')
  .query(true)
  .reply(200, {"etag":"eAExSFDcA2DBSUdDAVpqwWHDlWk","key":"etags158696680219207278","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T16:06:43+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 16:06:43 GMT',
  'ETag',
  '"eAExSFDcA2DBSUdDAVpqwWHDlWk"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyMzE5;sn=1902319',
  'x-ms-request-id',
  'e0cd9e2f-271f-409d-8ffa-f6af32d46530',
  'x-ms-correlation-request-id',
  'e0cd9e2f-271f-409d-8ffa-f6af32d46530',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
