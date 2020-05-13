let nock = require('nock');

module.exports.hash = "07d1ba0c1515945d43dfc620211bed32";

module.exports.testInfo = {"uniqueName":{"":"158741019984603234"},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  '4e1019e0-1af5-4a8a-916b-eb47d3612500',
  'x-ms-ests-server',
  '2.1.10393.21 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aob-X6FtDs9Ii2h14kJXhGUlh4xWAQAAABjsL9YOAAAA; expires=Wed, 20-May-2020 19:16:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Mon, 20 Apr 2020 19:16:40 GMT',
  'Content-Length',
  '1251'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/token-authentication-test-1587410199848', {"key":"token-authentication-test-1587410199848","value":"hello"})
  .query(true)
  .reply(200, {"etag":"RkWv0NEXTbutt0NzQkHHQeo3xlf","key":"token-authentication-test-1587410199848","label":null,"content_type":null,"value":"hello","tags":{},"locked":false,"last_modified":"2020-04-20T19:16:46+00:00"}, [
  'Server',
  'nginx/1.16.1',
  'Date',
  'Mon, 20 Apr 2020 19:16:45 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Mon, 20 Apr 2020 19:16:46 GMT',
  'ETag',
  '"RkWv0NEXTbutt0NzQkHHQeo3xlf"',
  'Sync-Token',
  'zAJw6V16=NjotMSMxOTI3ODk1;sn=1927895',
  'x-ms-request-id',
  '7a237c30-1444-448a-a478-f49c4fe6453a',
  'x-ms-correlation-request-id',
  '7a237c30-1444-448a-a478-f49c4fe6453a',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, x-ms-retry-after, x-ms-request-id, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
