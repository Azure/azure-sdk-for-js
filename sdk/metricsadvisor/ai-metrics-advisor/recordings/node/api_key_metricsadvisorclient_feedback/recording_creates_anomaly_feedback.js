let nock = require('nock');

module.exports.hash = "6fb6a8fcb5e6e29f7200eeb961cfb0a2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/3ed6dcd2-fd50-439a-9793-a5d0eca14f29',
  'x-request-id',
  'd945cc20-3981-4f68-88c9-adec0c6df047',
  'x-envoy-upstream-service-time',
  '554',
  'apim-request-id',
  'd945cc20-3981-4f68-88c9-adec0c6df047',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/3ed6dcd2-fd50-439a-9793-a5d0eca14f29')
  .reply(200, {"feedbackId":"3ed6dcd2-fd50-439a-9793-a5d0eca14f29","createdTime":"2022-01-08T02:16:30.816Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6cbdcfba-7596-4e44-9711-70d831bd8fd3',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  '6cbdcfba-7596-4e44-9711-70d831bd8fd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:30 GMT'
]);
