let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

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
  '91d5a887-b9c4-4618-9a67-2c4c41a2b900',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AgMXgTO5yHtAhl30AB-PPt8; expires=Wed, 08-Dec-2021 09:38:10 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:38:10 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f3ecb232-b592-4787-9167-2b045b6b1a1a',
  'x-request-id',
  '6c2f58fc-dc97-422b-97c5-f9d847ad037e',
  'x-envoy-upstream-service-time',
  '601',
  'apim-request-id',
  '6c2f58fc-dc97-422b-97c5-f9d847ad037e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f3ecb232-b592-4787-9167-2b045b6b1a1a')
  .reply(200, {"feedbackId":"f3ecb232-b592-4787-9167-2b045b6b1a1a","createdTime":"2021-11-08T09:38:11.4Z","userPrincipal":"azure_client_id","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '406',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '962e1509-39f2-4531-9931-58bbe157296f',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  '962e1509-39f2-4531-9931-58bbe157296f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:11 GMT'
]);
