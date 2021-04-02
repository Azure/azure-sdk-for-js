let nock = require('nock');

module.exports.hash = "dd567acdde6a2ad85c32bde70a9cfb5a";

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
  'ed9ad595-c949-4261-af64-5d93f1fe4200',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mCgAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:39:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:39:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/83ea6a49-e437-413a-8088-8103f5e0c686')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '07c1c74d-b833-44e3-833a-2cc63ebe0c68',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '07c1c74d-b833-44e3-833a-2cc63ebe0c68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/83ea6a49-e437-413a-8088-8103f5e0c686')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: b1a46e6c-6630-4ff0-a6e7-c0c8f7c0c2d0"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b394bc94-e269-42dd-a692-a787d34cd728',
  'x-envoy-upstream-service-time',
  '25',
  'apim-request-id',
  'b394bc94-e269-42dd-a692-a787d34cd728',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:12 GMT'
]);
