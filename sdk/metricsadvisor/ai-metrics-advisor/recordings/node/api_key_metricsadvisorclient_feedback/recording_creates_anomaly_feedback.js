let nock = require('nock');

module.exports.hash = "6fb6a8fcb5e6e29f7200eeb961cfb0a2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/5fc1a452-ca1d-459f-b313-58a157936036',
  'x-request-id',
  '0f121d35-ff1f-4746-9777-64725ab178d7',
  'x-envoy-upstream-service-time',
  '539',
  'apim-request-id',
  '0f121d35-ff1f-4746-9777-64725ab178d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/5fc1a452-ca1d-459f-b313-58a157936036')
  .reply(200, {"feedbackId":"5fc1a452-ca1d-459f-b313-58a157936036","createdTime":"2022-01-20T00:58:47.684Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c00843ac-453b-4f4b-98c5-870d1e239ffd',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  'c00843ac-453b-4f4b-98c5-870d1e239ffd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:47 GMT'
]);
