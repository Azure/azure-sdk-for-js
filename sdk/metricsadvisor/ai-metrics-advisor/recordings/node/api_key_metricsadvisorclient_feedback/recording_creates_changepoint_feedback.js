let nock = require('nock');

module.exports.hash = "c7345fd7bf5f50e035c5b86364b1888b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/daf91f82-1824-4e18-9a4f-ea7448c4c115',
  'x-request-id',
  'c542e3ed-d0f3-48e2-ad09-4c6976519e6b',
  'x-envoy-upstream-service-time',
  '509',
  'apim-request-id',
  'c542e3ed-d0f3-48e2-ad09-4c6976519e6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/daf91f82-1824-4e18-9a4f-ea7448c4c115')
  .reply(200, {"feedbackId":"daf91f82-1824-4e18-9a4f-ea7448c4c115","createdTime":"2021-11-16T00:32:49.26Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '401',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0d0a8acc-2573-4cab-a0b4-b57d4cf4c33e',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '0d0a8acc-2573-4cab-a0b4-b57d4cf4c33e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:49 GMT'
]);
