let nock = require('nock');

module.exports.hash = "d135bc8449ec64c99f6f48bde90627dd";

module.exports.testInfo = {"uniqueName":{"etags":"etags158690902049904895"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/etags158690902049904895', {"key":"etags158690902049904895","value":"some value"})
  .query(true)
  .reply(200, {"etag":"IpJTfYEEu9IQKKKULSRGB1ZsWl0","key":"etags158690902049904895","label":null,"content_type":null,"value":"some value","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"IpJTfYEEu9IQKKKULSRGB1ZsWl0"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA0;sn=1897404',
  'x-ms-request-id',
  '998aec7d-42a2-47c1-bbe2-028506374895',
  'x-ms-correlation-request-id',
  '998aec7d-42a2-47c1-bbe2-028506374895',
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
  .put('/kv/etags158690902049904895', {"key":"etags158690902049904895","value":"world"})
  .query(true)
  .reply(200, {"etag":"fQTz7ZwPS02uyj0K9XLFamHJytJ","key":"etags158690902049904895","label":null,"content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"fQTz7ZwPS02uyj0K9XLFamHJytJ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA1;sn=1897405',
  'x-ms-request-id',
  'f9de9cd1-de2f-4b1d-b73d-a00f53918f78',
  'x-ms-correlation-request-id',
  'f9de9cd1-de2f-4b1d-b73d-a00f53918f78',
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
  .get('/kv/etags158690902049904895')
  .query(true)
  .reply(304, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Connection',
  'close',
  'ETag',
  '"fQTz7ZwPS02uyj0K9XLFamHJytJ"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA1;sn=1897405',
  'x-ms-request-id',
  '8fc1b6ea-ba70-4bae-9e32-86c570e4f1a8',
  'x-ms-correlation-request-id',
  '8fc1b6ea-ba70-4bae-9e32-86c570e4f1a8',
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
  .put('/kv/etags158690902049904895', {"key":"etags158690902049904895","value":"new world"})
  .query(true)
  .reply(200, {"etag":"G5hSBPLJdt1EHa1oU3dcVwpflGB","key":"etags158690902049904895","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:40 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"G5hSBPLJdt1EHa1oU3dcVwpflGB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA2;sn=1897406',
  'x-ms-request-id',
  '11c914ed-7617-44ec-8b9c-ee608837c91e',
  'x-ms-correlation-request-id',
  '11c914ed-7617-44ec-8b9c-ee608837c91e',
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
  .get('/kv/etags158690902049904895')
  .query(true)
  .reply(200, {"etag":"G5hSBPLJdt1EHa1oU3dcVwpflGB","key":"etags158690902049904895","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"G5hSBPLJdt1EHa1oU3dcVwpflGB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA2;sn=1897406',
  'x-ms-request-id',
  'e6b5b30a-45eb-4304-a4b0-908524b38b2e',
  'x-ms-correlation-request-id',
  'e6b5b30a-45eb-4304-a4b0-908524b38b2e',
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
  .get('/kv/etags158690902049904895')
  .query(true)
  .reply(200, {"etag":"G5hSBPLJdt1EHa1oU3dcVwpflGB","key":"etags158690902049904895","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"G5hSBPLJdt1EHa1oU3dcVwpflGB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA2;sn=1897406',
  'x-ms-request-id',
  'f3c46188-5d24-4ba8-9e6f-601f400af8e3',
  'x-ms-correlation-request-id',
  'f3c46188-5d24-4ba8-9e6f-601f400af8e3',
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
  .reply(200, {"items":[{"etag":"G5hSBPLJdt1EHa1oU3dcVwpflGB","key":"etags158690902049904895","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA2;sn=1897406',
  'x-ms-request-id',
  '8725a3af-9f92-48fb-b90b-3e4d182c05fb',
  'x-ms-correlation-request-id',
  '8725a3af-9f92-48fb-b90b-3e4d182c05fb',
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
  .delete('/kv/etags158690902049904895')
  .query(true)
  .reply(200, {"etag":"G5hSBPLJdt1EHa1oU3dcVwpflGB","key":"etags158690902049904895","label":null,"content_type":null,"value":"new world","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:41+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:41 GMT',
  'ETag',
  '"G5hSBPLJdt1EHa1oU3dcVwpflGB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDA3;sn=1897407',
  'x-ms-request-id',
  'e7805cff-3376-4921-81ad-c46db3977d2e',
  'x-ms-correlation-request-id',
  'e7805cff-3376-4921-81ad-c46db3977d2e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
