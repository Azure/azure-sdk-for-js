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
  '829443e0-c7e0-44b5-85a5-588b51584300',
  'x-ms-ests-server',
  '2.1.11397.13 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AsoDeAShyiJLlORVED-UD3HGLH8mEQAAAGdLk9cOAAAA; expires=Sun, 14-Feb-2021 08:40:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 08:40:54 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"61601be6-8e0c-4239-acb5-58cc5d47834c","createdTime":"2021-01-15T08:35:50.6Z","userPrincipal":"krpratic@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Los Angeles"}},"feedbackType":"Period","value":{"periodType":"AssignValue","periodValue":2}},{"feedbackId":"5ea9b864-168b-4b1a-8bd3-2b49548e0f64","createdTime":"2021-01-15T08:40:41.034Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=2"}, [
  'Content-Length',
  '835',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4026fb48-c581-4a7f-b078-8f671eab978f',
  'x-envoy-upstream-service-time',
  '37',
  'apim-request-id',
  '4026fb48-c581-4a7f-b078-8f671eab978f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric/query', {"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f"})
  .query(true)
  .reply(200, {"value":[{"feedbackId":"5c1b7dcd-386a-4c8f-8b08-d3a71dd6684d","createdTime":"2021-01-15T08:40:40.119Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}},{"feedbackId":"0446b1b5-d167-40fc-855a-7891b22e49ee","createdTime":"2021-01-15T08:40:39.266Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/feedback/metric/query?$top=2&$skip=4"}, [
  'Content-Length',
  '909',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e7990f7c-9d17-4208-9faa-57112f30e0a7',
  'x-envoy-upstream-service-time',
  '41',
  'apim-request-id',
  'e7990f7c-9d17-4208-9faa-57112f30e0a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:54 GMT'
]);
