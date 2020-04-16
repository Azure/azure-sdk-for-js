let nock = require('nock');

module.exports.hash = "b351ecea2f471980ff909acc43699d12";

module.exports.testInfo = {"uniqueName":{"readOnlyTests":"readOnlyTests158700229516308352"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/readOnlyTests158700229516308352', {"key":"readOnlyTests158700229516308352","label":"some label","value":"world"})
  .query(true)
  .reply(200, {"etag":"eFMfxFbLMm4vYVz9dqoBUY4z4Lb","key":"readOnlyTests158700229516308352","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'ETag',
  '"eFMfxFbLMm4vYVz9dqoBUY4z4Lb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODQw;sn=1904840',
  'x-ms-request-id',
  '1cab59cc-44df-40dc-b1ea-82ba422bacbd',
  'x-ms-correlation-request-id',
  '1cab59cc-44df-40dc-b1ea-82ba422bacbd',
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
  .get('/kv/readOnlyTests158700229516308352')
  .query(true)
  .reply(200, {"etag":"eFMfxFbLMm4vYVz9dqoBUY4z4Lb","key":"readOnlyTests158700229516308352","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'ETag',
  '"eFMfxFbLMm4vYVz9dqoBUY4z4Lb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODQw;sn=1904840',
  'x-ms-request-id',
  'fc6a2e09-93c7-42ff-96b7-de52a73e994a',
  'x-ms-correlation-request-id',
  'fc6a2e09-93c7-42ff-96b7-de52a73e994a',
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
  .reply(200, {"items":[{"etag":"eFMfxFbLMm4vYVz9dqoBUY4z4Lb","key":"readOnlyTests158700229516308352","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODQw;sn=1904840',
  'x-ms-request-id',
  'f660f2a7-7e6b-44f7-8a85-a31ad736af17',
  'x-ms-correlation-request-id',
  'f660f2a7-7e6b-44f7-8a85-a31ad736af17',
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
  .delete('/kv/readOnlyTests158700229516308352')
  .query(true)
  .reply(200, {"etag":"eFMfxFbLMm4vYVz9dqoBUY4z4Lb","key":"readOnlyTests158700229516308352","label":"some label","content_type":null,"value":"world","tags":{},"locked":false,"last_modified":"2020-04-16T01:58:15+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 16 Apr 2020 01:58:15 GMT',
  'ETag',
  '"eFMfxFbLMm4vYVz9dqoBUY4z4Lb"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTA0ODQx;sn=1904841',
  'x-ms-request-id',
  '0524589a-4f95-493d-9ecd-312945f6275e',
  'x-ms-correlation-request-id',
  '0524589a-4f95-493d-9ecd-312945f6275e',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
