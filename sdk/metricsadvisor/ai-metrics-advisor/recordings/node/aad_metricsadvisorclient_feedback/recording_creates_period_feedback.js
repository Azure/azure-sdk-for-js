let nock = require('nock');

module.exports.hash = "6b134f5d9f17ca45c75a6cabef0570f5";

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
  'cef52c95-f959-404b-ad16-fef5e008c800',
  'x-ms-ests-server',
  '2.1.11722.21 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mEAAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:10:11 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:10:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/20182b6a-8c77-449c-8599-7ac70430517e',
  'x-request-id',
  'd97c8edb-880e-4f37-8941-84a0f3619d6b',
  'x-envoy-upstream-service-time',
  '193',
  'apim-request-id',
  'd97c8edb-880e-4f37-8941-84a0f3619d6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/20182b6a-8c77-449c-8599-7ac70430517e')
  .reply(200, {"feedbackId":"20182b6a-8c77-449c-8599-7ac70430517e","createdTime":"2021-05-15T04:10:11.262Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '351',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e1d03b23-580b-4217-9d8b-2a0cfe8c927b',
  'x-envoy-upstream-service-time',
  '58',
  'apim-request-id',
  'e1d03b23-580b-4217-9d8b-2a0cfe8c927b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:11 GMT'
]);
