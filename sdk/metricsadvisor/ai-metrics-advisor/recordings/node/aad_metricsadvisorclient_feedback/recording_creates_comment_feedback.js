let nock = require('nock');

module.exports.hash = "a8f499eec770cfb0ecbda9095b34bd28";

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
  '6bb8cddf-8c85-4329-80b0-dd2541209900',
  'x-ms-ests-server',
  '2.1.11654.16 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Al6bdrvt6wFJo3tvRWyi3zfGLH8mAQAAAPurGdgOAAAA; expires=Thu, 27-May-2021 06:53:48 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 27 Apr 2021 06:53:47 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/1edb0978-ee59-4ed8-9dad-9100b656ee60',
  'x-request-id',
  '3db4f89a-2b5c-4675-80c3-7b4b4048b796',
  'x-envoy-upstream-service-time',
  '5528',
  'apim-request-id',
  '3db4f89a-2b5c-4675-80c3-7b4b4048b796',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:53:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/1edb0978-ee59-4ed8-9dad-9100b656ee60')
  .reply(200, {"feedbackId":"1edb0978-ee59-4ed8-9dad-9100b656ee60","createdTime":"2021-04-27T06:53:54.18Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '344',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '20778bce-f9fa-473d-925d-e8f248fe73c1',
  'x-envoy-upstream-service-time',
  '5269',
  'apim-request-id',
  '20778bce-f9fa-473d-925d-e8f248fe73c1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:53:59 GMT'
]);
