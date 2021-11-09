let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

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
  '25e0704b-bf39-4446-b5a1-0be3377c9700',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjwPJgaeFq1NrXKBkWgGFU4; expires=Wed, 08-Dec-2021 09:38:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:45 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ce7bba4a-daa3-475e-b9c4-64e29d7c3c53')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '21c287f2-d14c-4627-9536-0798d89d0f93',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '21c287f2-d14c-4627-9536-0798d89d0f93',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ce7bba4a-daa3-475e-b9c4-64e29d7c3c53')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6b451ed-f990-48d6-8e27-94aa2589fb36',
  'x-envoy-upstream-service-time',
  '16',
  'apim-request-id',
  'd6b451ed-f990-48d6-8e27-94aa2589fb36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:46 GMT'
]);
