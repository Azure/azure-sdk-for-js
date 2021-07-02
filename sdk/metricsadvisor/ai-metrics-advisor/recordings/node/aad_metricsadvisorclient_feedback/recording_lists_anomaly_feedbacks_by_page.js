let nock = require('nock');

module.exports.hash = "f2ac698351b194c1adeed6f2c2b978d1";

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
  '12d387ce-3e4f-49a0-a765-e14a8c21a900',
  'x-ms-ests-server',
  '2.1.11722.26 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mEgAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:07:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:07:44 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"5f791eb0-28de-42bd-875e-6f2dbc9d9e0a","createdTime":"2021-06-02T07:07:27.624Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}},{"feedbackId":"33d8e8b5-7068-4302-af19-5e8e637245f6","createdTime":"2021-06-02T07:07:21.887Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '847',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0b0b9a1f-468a-45c3-93b5-46d705d3a3d1',
  'x-envoy-upstream-service-time',
  '121',
  'apim-request-id',
  '0b0b9a1f-468a-45c3-93b5-46d705d3a3d1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:45 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"be48d74c-52a2-4b95-954b-6a421876a246","createdTime":"2021-06-02T07:07:16.318Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}},{"feedbackId":"d16f16e2-f9c9-4a93-8a39-177197e01a9c","createdTime":"2021-06-02T07:07:05.524Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '972',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '99e34822-a074-4219-a701-bf4a6f38a3db',
  'x-envoy-upstream-service-time',
  '5113',
  'apim-request-id',
  '99e34822-a074-4219-a701-bf4a6f38a3db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:50 GMT'
]);
