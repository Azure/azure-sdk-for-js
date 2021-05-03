let nock = require('nock');

module.exports.hash = "6d5f77bddbd4873fda347b16a640dc98";

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
  '4b8da356-d9e7-4ad0-bbe3-f579a9870301',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Al6bdrvt6wFJo3tvRWyi3zfGLH8mAgAAAPurGdgOAAAA; expires=Thu, 27-May-2021 06:53:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 27 Apr 2021 06:53:59 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/1edb0978-ee59-4ed8-9dad-9100b656ee60')
  .reply(200, {"feedbackId":"1edb0978-ee59-4ed8-9dad-9100b656ee60","createdTime":"2021-04-27T06:53:54.18Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '344',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3ea2bfc8-c389-4f01-8312-3fcabc8afb73',
  'x-envoy-upstream-service-time',
  '5281',
  'apim-request-id',
  '3ea2bfc8-c389-4f01-8312-3fcabc8afb73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:54:05 GMT'
]);
