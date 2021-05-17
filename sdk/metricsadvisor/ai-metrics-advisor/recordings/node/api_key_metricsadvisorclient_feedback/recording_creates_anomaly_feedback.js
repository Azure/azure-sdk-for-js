let nock = require('nock');

module.exports.hash = "3b1492ef703380ec641e07cde5f38c87";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/30fe2c26-7685-4343-8485-7cb44ddd1b04',
  'x-request-id',
  'f0bd05f5-5774-414c-a25a-8fa0bd1ffe42',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  'f0bd05f5-5774-414c-a25a-8fa0bd1ffe42',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/30fe2c26-7685-4343-8485-7cb44ddd1b04')
  .reply(200, {"feedbackId":"30fe2c26-7685-4343-8485-7cb44ddd1b04","createdTime":"2021-05-15T04:10:34.293Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '391',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6fd1806-ac83-4bba-b4d1-c29a4a3f5e3a',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'd6fd1806-ac83-4bba-b4d1-c29a4a3f5e3a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:33 GMT'
]);
