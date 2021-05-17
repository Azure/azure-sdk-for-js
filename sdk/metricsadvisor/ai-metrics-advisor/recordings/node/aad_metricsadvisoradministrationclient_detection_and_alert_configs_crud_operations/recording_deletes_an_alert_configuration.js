let nock = require('nock');

module.exports.hash = "92461016236353b27959e8d6297a3efe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  '305aa68c-32ec-4040-8392-ba0b5785c700',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mBwAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:08:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:08:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '60af6634-3387-483a-945b-f143b7256df0',
  'x-envoy-upstream-service-time',
  '5201',
  'apim-request-id',
  '60af6634-3387-483a-945b-f143b7256df0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e7d268eb-1487-4f00-9ec3-cb3f59bdc70c')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 58ce35b0-a8f9-4674-a91a-e7ae9bb08846"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '732b537b-7241-4c52-9a2f-db36ac37d0bd',
  'x-envoy-upstream-service-time',
  '497',
  'apim-request-id',
  '732b537b-7241-4c52-9a2f-db36ac37d0bd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:46 GMT'
]);
