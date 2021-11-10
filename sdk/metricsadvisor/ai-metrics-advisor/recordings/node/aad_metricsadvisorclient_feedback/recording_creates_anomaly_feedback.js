let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

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
  '46cc9789-a7f4-408f-a602-875e7b642d00',
  'x-ms-ests-server',
  '2.1.12231.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AlSTBKMN3x9Mg7v5tS-ukGg; expires=Fri, 10-Dec-2021 02:07:15 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:15 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/8c54cbd8-a62f-4041-ba1f-1319b0bd1079',
  'x-request-id',
  '854549a6-06c6-4fe9-a173-e18460c9958f',
  'x-envoy-upstream-service-time',
  '489',
  'apim-request-id',
  '854549a6-06c6-4fe9-a173-e18460c9958f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/8c54cbd8-a62f-4041-ba1f-1319b0bd1079')
  .reply(200, {"feedbackId":"8c54cbd8-a62f-4041-ba1f-1319b0bd1079","createdTime":"2021-11-10T02:07:16.175Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '408',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'af4ef2e5-3783-4ba0-bafb-a406860d00f2',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  'af4ef2e5-3783-4ba0-bafb-a406860d00f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:16 GMT'
]);
