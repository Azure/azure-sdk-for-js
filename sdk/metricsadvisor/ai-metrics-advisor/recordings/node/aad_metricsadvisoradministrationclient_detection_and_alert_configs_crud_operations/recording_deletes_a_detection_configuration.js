let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '80e797c2-f799-40b7-a2b5-65255fcc8c00',
  'x-ms-ests-server',
  '2.1.12197.4 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApI-l6nMo11Ig2i7aJD6wh3GLH8mAQAAAPHmGtkOAAAA; expires=Wed, 08-Dec-2021 09:37:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:37:53 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/110910a1-a23d-4b80-b8f5-094a75eee9c0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9f307efc-24e2-44fb-abe5-6c2f58082150',
  'x-envoy-upstream-service-time',
  '53',
  'apim-request-id',
  '9f307efc-24e2-44fb-abe5-6c2f58082150',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/110910a1-a23d-4b80-b8f5-094a75eee9c0')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 5ca6d0f3-6c8c-4fa7-8b38-15a4fbc1faeb"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5ca6d0f3-6c8c-4fa7-8b38-15a4fbc1faeb',
  'x-envoy-upstream-service-time',
  '28',
  'apim-request-id',
  '5ca6d0f3-6c8c-4fa7-8b38-15a4fbc1faeb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:54 GMT'
]);
