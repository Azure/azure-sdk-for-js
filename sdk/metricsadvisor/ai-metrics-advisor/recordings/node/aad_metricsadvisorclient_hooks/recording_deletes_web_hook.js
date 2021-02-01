let nock = require('nock');

module.exports.hash = "306ac624242c264b71f793ddad9dfc4e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'd8ec575f-3842-4551-9e83-4836d3ec4500',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mFAAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:42:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:42:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/hooks/e9456779-51d7-4fc8-9ecf-3e6b20215d50')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6e0d9135-7bbe-4b65-b920-992f371e2587',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '6e0d9135-7bbe-4b65-b920-992f371e2587',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/e9456779-51d7-4fc8-9ecf-3e6b20215d50')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"hookId is invalid."}, [
  'Content-Length',
  '65',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5ba6da20-95d9-4153-ae8d-b00281599c14',
  'x-envoy-upstream-service-time',
  '14',
  'apim-request-id',
  '5ba6da20-95d9-4153-ae8d-b00281599c14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:59 GMT'
]);
