let nock = require('nock');

module.exports.hash = "77a5615dcac152d1ed00cc0fb76eb101";

module.exports.testInfo = {"uniqueName":{"addConfigTestTwice":"addConfigTestTwice158690902618103024"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/addConfigTestTwice158690902618103024', {"key":"addConfigTestTwice158690902618103024","label":"test","value":"foo"})
  .query(true)
  .reply(200, {"etag":"vd8VIrvdpbs1ntkzuyumdrBDCC1","key":"addConfigTestTwice158690902618103024","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"vd8VIrvdpbs1ntkzuyumdrBDCC1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI4;sn=1897428',
  'x-ms-request-id',
  '1263d2c9-671e-48ca-b83d-191ede3ae6ba',
  'x-ms-correlation-request-id',
  '1263d2c9-671e-48ca-b83d-191ede3ae6ba',
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
  .put('/kv/addConfigTestTwice158690902618103024', {"key":"addConfigTestTwice158690902618103024","label":"test","value":"foo"})
  .query(true)
  .reply(412, "", [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Length',
  '0',
  'Connection',
  'close',
  'x-ms-request-id',
  'f13fc17b-6ea4-4830-9e0a-7641666bc8e3',
  'x-ms-correlation-request-id',
  'f13fc17b-6ea4-4830-9e0a-7641666bc8e3',
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
  .delete('/kv/addConfigTestTwice158690902618103024')
  .query(true)
  .reply(200, {"etag":"vd8VIrvdpbs1ntkzuyumdrBDCC1","key":"addConfigTestTwice158690902618103024","label":"test","content_type":null,"value":"foo","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:46 GMT',
  'ETag',
  '"vd8VIrvdpbs1ntkzuyumdrBDCC1"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDI5;sn=1897429',
  'x-ms-request-id',
  '99bce97b-c211-445b-845a-9ffceecfd993',
  'x-ms-correlation-request-id',
  '99bce97b-c211-445b-845a-9ffceecfd993',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
