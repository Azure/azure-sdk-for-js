let nock = require('nock');

module.exports.hash = "3b1492ef703380ec641e07cde5f38c87";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/a5a633dd-c5cb-48a3-815c-959fb616ac19',
  'x-request-id',
  'dd4349a3-8e7f-4229-b9c4-07430f448333',
  'x-envoy-upstream-service-time',
  '331',
  'apim-request-id',
  'dd4349a3-8e7f-4229-b9c4-07430f448333',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/a5a633dd-c5cb-48a3-815c-959fb616ac19')
  .reply(200, {"feedbackId":"a5a633dd-c5cb-48a3-815c-959fb616ac19","createdTime":"2021-06-02T07:08:01.429Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2916f716-c1d0-4a2a-b275-3ef04ee60f8d',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '2916f716-c1d0-4a2a-b275-3ef04ee60f8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:00 GMT'
]);
