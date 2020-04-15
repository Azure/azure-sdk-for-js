let nock = require('nock');

module.exports.hash = "909716576a63b2dfe675322a852f4399";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .get('/revisions')
  .query(true)
  .reply(200, {"items":[{"etag":"h73gkoXAl7lSrnnJuWrt80GKJNV","key":"doesntmatter","label":null,"content_type":null,"value":null,"tags":{},"locked":false,"last_modified":"2020-04-15T16:11:16+00:00"},{"etag":"Eow4pfZNUSYoVPr11ZznrLNRXLo","key":"doesntmatter","label":null,"content_type":null,"value":null,"tags":{},"locked":false,"last_modified":"2020-04-15T16:11:16+00:00"}]}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 16:11:16 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kvset+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Accept-Ranges',
  'items',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTAyODU2;sn=1902856',
  'x-ms-request-id',
  '0d627001-9c6a-4415-b8ee-27c566109ff3',
  'x-ms-correlation-request-id',
  '0d627001-9c6a-4415-b8ee-27c566109ff3',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
