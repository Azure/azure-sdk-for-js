let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/c83abf5a-ea7e-438b-8ddf-1f2a08766499',
  'x-request-id',
  '4e7f25d9-8949-4396-81fc-02e715434a9a',
  'x-envoy-upstream-service-time',
  '502',
  'apim-request-id',
  '4e7f25d9-8949-4396-81fc-02e715434a9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/c83abf5a-ea7e-438b-8ddf-1f2a08766499')
  .reply(200, {"feedbackId":"c83abf5a-ea7e-438b-8ddf-1f2a08766499","createdTime":"2021-11-16T00:32:48.566Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09822d82-da19-4a64-8d6f-615e5addd5eb',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '09822d82-da19-4a64-8d6f-615e5addd5eb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:48 GMT'
]);
