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
  '5109f666-238e-4ec6-90af-389f4930b600',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApMiV2hwPd1Ln66gTNQblIY; expires=Wed, 08-Dec-2021 04:05:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 04:05:06 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/9459cc1d-613e-4abd-bcc6-dbcc44dfeb84')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '52dc70e1-8a2a-4292-ae0c-6d97d2016afe',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  '52dc70e1-8a2a-4292-ae0c-6d97d2016afe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/9459cc1d-613e-4abd-bcc6-dbcc44dfeb84')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6f68d762-a3e4-4f51-a08d-5b1286812c71',
  'x-envoy-upstream-service-time',
  '39',
  'apim-request-id',
  '6f68d762-a3e4-4f51-a08d-5b1286812c71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:06 GMT'
]);
