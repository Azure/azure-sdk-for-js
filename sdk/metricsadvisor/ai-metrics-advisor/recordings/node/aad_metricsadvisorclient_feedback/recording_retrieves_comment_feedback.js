let nock = require('nock');

module.exports.hash = "3c53229a0b55a669295c5611bc35a6e4";

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
  '46cc9789-a7f4-408f-a602-875ee7642d00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Aqn_TmGQRG1KpyCwFOFllHk; expires=Fri, 10-Dec-2021 02:07:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:18 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/3e36e68f-9261-453d-937c-aae2023cf1c6')
  .reply(200, {"feedbackId":"3e36e68f-9261-453d-937c-aae2023cf1c6","createdTime":"2021-11-10T02:07:18.481Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '347',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ac35783e-bc8d-4534-8f61-1c9649356640',
  'x-envoy-upstream-service-time',
  '49',
  'apim-request-id',
  'ac35783e-bc8d-4534-8f61-1c9649356640',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:18 GMT'
]);
