let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

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
  'c211e01d-cf15-4f96-b833-5ee4c83f8c00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AtkpTfBPpj1KnTs5Oo9__lQ; expires=Wed, 08-Dec-2021 09:38:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:48 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f96a63a5-5111-4779-90a9-88dc75e56134')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd184ac36-c601-4c0b-8ab4-f17e44018da5',
  'x-envoy-upstream-service-time',
  '268',
  'apim-request-id',
  'd184ac36-c601-4c0b-8ab4-f17e44018da5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f96a63a5-5111-4779-90a9-88dc75e56134')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '43f35658-9bbe-4d48-8c27-16e2f7918d3f',
  'x-envoy-upstream-service-time',
  '26',
  'apim-request-id',
  '43f35658-9bbe-4d48-8c27-16e2f7918d3f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:49 GMT'
]);
