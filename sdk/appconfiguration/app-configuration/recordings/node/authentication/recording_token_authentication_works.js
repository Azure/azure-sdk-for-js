let nock = require('nock');

module.exports.hash = "42c3737eb386b396df511204ddbde511";

module.exports.testInfo = {"uniqueName":{},"newDate":{"label-1":"2021-03-22T18:07:20.673Z"}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azuretenantid/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmyappconfig.azconfig.io%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1325',
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
  'ea229a1f-d5dc-4cc1-a764-0df8cbb1d500',
  'x-ms-ests-server',
  '2.1.11562.10 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aj3w4dYnNZBIoCZJVZLTk0jS-rn7AQAAANjT6tcOAAAA; expires=Wed, 21-Apr-2021 18:07:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 22 Mar 2021 18:07:19 GMT'
]);

nock('https://myappconfig.azconfig.io:443', {"encodedQueryParams":true})
  .put('/kv/token-authentication-test-1616436440673', {"key":"token-authentication-test-1616436440673","value":"hello"})
  .query(true)
  .reply(200, {"etag":"ZwGUFZirN68lX3ICM0mcLVYZYmb","key":"token-authentication-test-1616436440673","label":null,"content_type":null,"value":"hello","tags":{},"locked":false,"last_modified":"2021-03-22T18:07:21+00:00"}, [
  'Server',
  'openresty/1.17.8.2',
  'Date',
  'Mon, 22 Mar 2021 18:07:21 GMT',
  'Content-Type',
  'application/vnd.microsoft.appconfig.kv+json; charset=utf-8',
  'Transfer-Encoding',
  'chunked',
  'Connection',
  'close',
  'Last-Modified',
  'Mon, 22 Mar 2021 18:07:21 GMT',
  'ETag',
  '"ZwGUFZirN68lX3ICM0mcLVYZYmb"',
  'Sync-Token',
  'zAJw6V16=NTo1IzI5ODM2MzY=;sn=2983636',
  'x-ms-request-id',
  'd22be442-16df-46f6-8cd9-d1aeccfea61c',
  'x-ms-correlation-request-id',
  'd22be442-16df-46f6-8cd9-d1aeccfea61c',
  'Access-Control-Allow-Origin',
  '*',
  'Access-Control-Allow-Credentials',
  'true',
  'Access-Control-Expose-Headers',
  'DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Authorization, x-ms-client-request-id, x-ms-useragent, x-ms-content-sha256, x-ms-date, host, Accept, Accept-Datetime, Date, If-Match, If-None-Match, Sync-Token, x-ms-return-client-request-id, ETag, Last-Modified, Link, Memento-Datetime, retry-after-ms, x-ms-request-id, x-ms-client-session-id, x-ms-effective-locale, WWW-Authenticate',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains'
]);
