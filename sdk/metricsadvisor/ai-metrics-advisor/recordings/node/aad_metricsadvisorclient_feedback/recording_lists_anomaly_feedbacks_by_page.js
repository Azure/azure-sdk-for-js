let nock = require('nock');

module.exports.hash = "133b8cb43d2437b7b9c92a4af35721dd";

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
  'bf3938dc-2bf3-4803-8747-c6fef1c49f00',
  'x-ms-ests-server',
  '2.1.12197.4 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Ao6i6Y4pzyhOk8NkZh_k49PGLH8mAQAAAAbnGtkOAAAA; expires=Wed, 08-Dec-2021 09:38:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:14 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"f3ecb232-b592-4787-9167-2b045b6b1a1a","createdTime":"2021-11-08T09:38:11.4Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}},{"feedbackId":"9f949c9f-3f2d-431e-8337-291c5165aade","createdTime":"2021-11-08T09:38:13.603Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '904',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1f7808f8-109a-4577-bb28-4baa49a393e7',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '1f7808f8-109a-4577-bb28-4baa49a393e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"6411be4b-7acf-4423-a9a0-90370510ccb1","createdTime":"2021-11-08T09:38:12.921Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}},{"feedbackId":"039c3cc8-36f5-420a-b3ab-fedcfa07099d","createdTime":"2021-11-08T09:38:12.209Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '921',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd37eb047-124e-466d-a190-9aa470f57e30',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'd37eb047-124e-466d-a190-9aa470f57e30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:14 GMT'
]);
