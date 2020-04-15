let nock = require('nock');

module.exports.hash = "f819341afd79be61d1a42e20125cb43a";

module.exports.testInfo = {"uniqueName":{"getConfigurationSettingByDate":"getConfigurationSettingByDate158690902831509646"},"newDate":{}}

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/getConfigurationSettingByDate158690902831509646', {"key":"getConfigurationSettingByDate158690902831509646","value":"value1"})
  .query(true)
  .reply(200, {"etag":"utIdWwe28YT89YufKZ9xPYhFscp","key":"getConfigurationSettingByDate158690902831509646","label":null,"content_type":null,"value":"value1","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'ETag',
  '"utIdWwe28YT89YufKZ9xPYhFscp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQw;sn=1897440',
  'x-ms-request-id',
  '71963464-12fa-4b31-acae-3dd914d66085',
  'x-ms-correlation-request-id',
  '71963464-12fa-4b31-acae-3dd914d66085',
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
  .put('/kv/getConfigurationSettingByDate158690902831509646', {"key":"getConfigurationSettingByDate158690902831509646","value":"value2"})
  .query(true)
  .reply(200, {"etag":"XBuTlBaQCMZsMEfZ24RLuL503Vp","key":"getConfigurationSettingByDate158690902831509646","label":null,"content_type":null,"value":"value2","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:50+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:50 GMT',
  'ETag',
  '"XBuTlBaQCMZsMEfZ24RLuL503Vp"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQx;sn=1897441',
  'x-ms-request-id',
  '87b70e11-1ff6-4cd9-888d-fc0489c060b8',
  'x-ms-correlation-request-id',
  '87b70e11-1ff6-4cd9-888d-fc0489c060b8',
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
  .get('/kv/getConfigurationSettingByDate158690902831509646')
  .query(true)
  .reply(200, {"etag":"utIdWwe28YT89YufKZ9xPYhFscp","key":"getConfigurationSettingByDate158690902831509646","label":null,"content_type":null,"value":"value1","tags":{},"locked":false,"last_modified":"2020-04-15T00:03:48+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Wed, 15 Apr 2020 00:03:49 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'ETag',
  '"utIdWwe28YT89YufKZ9xPYhFscp"',
  'Memento-Datetime',
  'Wed, 15 Apr 2020 00:03:48 GMT',
  'Link',
  '</kv/getConfigurationSettingByDate158690902831509646?api-version=1.0>; rel="original"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxODk3NDQx;sn=1897441',
  'x-ms-request-id',
  'eef8b7a3-d13a-4a27-9a24-f5cee5ab0553',
  'x-ms-correlation-request-id',
  'eef8b7a3-d13a-4a27-9a24-f5cee5ab0553',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
