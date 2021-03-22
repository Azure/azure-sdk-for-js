let nock = require('nock');

module.exports.hash = "0da3a95bee3eadea6620849071f26933";

module.exports.testInfo = {"uniqueName":{},"newDate":{"label-1":"2021-03-22T09:40:36.971Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
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
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '6dc4a203-7e90-4167-8828-58f976ecc100',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AiDVV0Ey55NGh0DM-D_m_WPS-rn7AQAAABRd6tcOAAAA; expires=Wed, 21-Apr-2021 09:40:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 22 Mar 2021 09:40:37 GMT',
  'Content-Length',
  '1325'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/token-authentication-test-Mon%20Mar%2022%202021%2002%3A40%3A36%20GMT-0700%20(Pacific%20Daylight%20Time)', {"key":"token-authentication-test-Mon Mar 22 2021 02:40:36 GMT-0700 (Pacific Daylight Time)","value":"hello"})
  .query(true)
  .reply(200, {"etag":"ljIjxAJOqK5lgrHa88I54sVrbPJ","key":"token-authentication-test-Mon Mar 22 2021 02:40:36 GMT-0700 (Pacific Daylight Time)","label":null,"content_type":null,"value":"hello","tags":{},"locked":false,"last_modified":"2021-03-22T09:40:37+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Mon, 22 Mar 2021 09:40:37 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Mon, 22 Mar 2021 09:40:37 GMT',
  'ETag',
  '"ljIjxAJOqK5lgrHa88I54sVrbPJ"',
  'Sync-Token',
  'zAJw6V16=NTo1IzI5ODI1Mzc=;sn=2982537',
  'x-ms-request-id',
  '4d3912b0-8e2d-44ee-8254-739ba57378bf',
  'x-ms-correlation-request-id',
  '4d3912b0-8e2d-44ee-8254-739ba57378bf',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
