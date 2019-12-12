let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"":"157618858141607651"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/AZURE_TENANT_ID/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=AZURE_CLIENT_ID&client_secret=AZURE_CLIENT_SECRET&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3600,"ext_expires_in":3600,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'x-ms-request-id',
  'e2dc9e1f-4343-4e48-b658-39d5ffdf0a00',
  'x-ms-ests-server',
  '2.1.9707.19 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AtPuEiFxJGhOn11AF25HqzCknlA2AQAAAKWxhNUOAAAA; expires=Sat, 11-Jan-2020 22:09:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Thu, 12 Dec 2019 22:09:41 GMT',
  'Content-Length',
  '1244'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/token-authentication-test-157618858141607651', {"key":"token-authentication-test-157618858141607651","value":"hello"})
  .query(true)
  .reply(200, {"etag":"STgd4ieb5Jw7WrQTDO3bUCoAfdH","key":"token-authentication-test-157618858141607651","label":null,"content_type":null,"value":"hello","tags":{},"locked":false,"last_modified":"2019-12-12T22:09:42+00:00"}, [
  'Server',
  'openresty/1.15.8.1',
  'Date',
  'Thu, 12 Dec 2019 22:09:41 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Thu, 12 Dec 2019 22:09:42 GMT',
  'ETag',
  '"STgd4ieb5Jw7WrQTDO3bUCoAfdH"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxMzUyMDU0;sn=1352054',
  'x-ms-request-id',
  '7ba486dc-b096-4b1b-8ff9-009d3f2bcf77',
  'x-ms-correlation-request-id',
  '7ba486dc-b096-4b1b-8ff9-009d3f2bcf77',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Allow-Methods',
  'GET, PUT, POST, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
