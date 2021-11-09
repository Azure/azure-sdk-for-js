let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  'de7b15e0-a6be-48aa-a5b6-1e53a64dab00',
  'x-ms-ests-server',
  '2.1.12197.4 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AtJIRVhHv29LqWNlmn4fDfk; expires=Wed, 08-Dec-2021 09:38:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:38 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c70878a6-2d9c-4e15-8bfc-95877180fe27')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '11a62f51-fcf3-42fe-9519-8a1521dd776f',
  'x-envoy-upstream-service-time',
  '251',
  'apim-request-id',
  '11a62f51-fcf3-42fe-9519-8a1521dd776f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c70878a6-2d9c-4e15-8bfc-95877180fe27')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4a80ed52-679d-4588-97ea-f0386a25d538',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '4a80ed52-679d-4588-97ea-f0386a25d538',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:38 GMT'
]);
