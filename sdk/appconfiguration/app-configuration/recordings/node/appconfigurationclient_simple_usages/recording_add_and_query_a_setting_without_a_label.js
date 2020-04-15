let nock = require('nock');

module.exports.hash = "f70e238588f3f3f2b4abc2bfe3cd3749";

module.exports.testInfo = {"uniqueName":{"noLabelTests":"noLabelTests158690902492805519"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/noLabelTests158690902492805519', {"key":"noLabelTests158690902492805519","value":"added"})
  .query(true)
  .reply(200, {"etag":"JcOlw2DYztIjwBoob87GbY8eHAB","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"JcOlw2DYztIjwBoob87GbY8eHAB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIw;sn=1897420',
  'x-ms-request-id',
  '2fb78e84-ba02-4f28-85f7-16cd70b950c5',
  'x-ms-correlation-request-id',
  '2fb78e84-ba02-4f28-85f7-16cd70b950c5',
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
  .get('/kv/noLabelTests158690902492805519')
  .query(true)
  .reply(200, {"etag":"JcOlw2DYztIjwBoob87GbY8eHAB","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"JcOlw2DYztIjwBoob87GbY8eHAB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIw;sn=1897420',
  'x-ms-request-id',
  '0162b486-641d-4d56-ae8a-46433fafdd26',
  'x-ms-correlation-request-id',
  '0162b486-641d-4d56-ae8a-46433fafdd26',
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
  .delete('/kv/noLabelTests158690902492805519')
  .query(true)
  .reply(200, {"etag":"JcOlw2DYztIjwBoob87GbY8eHAB","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"added","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"JcOlw2DYztIjwBoob87GbY8eHAB"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIx;sn=1897421',
  'x-ms-request-id',
  '9cb5fce6-1de5-450b-a9a1-f683c24cfe7e',
  'x-ms-correlation-request-id',
  '9cb5fce6-1de5-450b-a9a1-f683c24cfe7e',
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
  .put('/kv/noLabelTests158690902492805519', {"key":"noLabelTests158690902492805519","value":"set"})
  .query(true)
  .reply(200, {"etag":"mORvwa5bF4aulrVBxQ8tytbl0SA","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"set","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"mORvwa5bF4aulrVBxQ8tytbl0SA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIy;sn=1897422',
  'x-ms-request-id',
  '1cb93f32-f355-4d59-a127-39b466441c43',
  'x-ms-correlation-request-id',
  '1cb93f32-f355-4d59-a127-39b466441c43',
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
  .get('/kv/noLabelTests158690902492805519')
  .query(true)
  .reply(200, {"etag":"mORvwa5bF4aulrVBxQ8tytbl0SA","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"set","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:45+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'ETag',
  '"mORvwa5bF4aulrVBxQ8tytbl0SA"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIy;sn=1897422',
  'x-ms-request-id',
  '22f64eb0-5fd1-41ea-adef-b76aca8da468',
  'x-ms-correlation-request-id',
  '22f64eb0-5fd1-41ea-adef-b76aca8da468',
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
  .put('/kv/noLabelTests158690902492805519', {"key":"noLabelTests158690902492805519","value":"set a second time"})
  .query(true)
  .reply(200, {"etag":"3cNrXMtwFNRy7AVkZkqU0EWKShM","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"3cNrXMtwFNRy7AVkZkqU0EWKShM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIz;sn=1897423',
  'x-ms-request-id',
  '74a18787-a88e-4c0b-a26b-641853a399dc',
  'x-ms-correlation-request-id',
  '74a18787-a88e-4c0b-a26b-641853a399dc',
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
  .get('/kv/noLabelTests158690902492805519')
  .query(true)
  .reply(200, {"etag":"3cNrXMtwFNRy7AVkZkqU0EWKShM","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"3cNrXMtwFNRy7AVkZkqU0EWKShM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDIz;sn=1897423',
  'x-ms-request-id',
  '597a54f8-0855-4240-8c94-9695e5878aae',
  'x-ms-correlation-request-id',
  '597a54f8-0855-4240-8c94-9695e5878aae',
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
  .delete('/kv/noLabelTests158690902492805519')
  .query(true)
  .reply(200, {"etag":"3cNrXMtwFNRy7AVkZkqU0EWKShM","key":"noLabelTests158690902492805519","label":null,"content_type":null,"value":"set a second time","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"3cNrXMtwFNRy7AVkZkqU0EWKShM"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI0;sn=1897424',
  'x-ms-request-id',
  'ba0e287f-a887-470d-94b3-40d0fcd1de29',
  'x-ms-correlation-request-id',
  'ba0e287f-a887-470d-94b3-40d0fcd1de29',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
