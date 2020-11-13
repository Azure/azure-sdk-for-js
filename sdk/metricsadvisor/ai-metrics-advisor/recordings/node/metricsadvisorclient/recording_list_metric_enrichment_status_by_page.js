let nock = require('nock');

module.exports.hash = "f12ddcaae0814e33fd81cbe888f38e6f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-01T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2020-11-05T18:37:01.002Z\",\"CreateTime\":\"2020-11-05T18:37:01.002Z\"}"},{"timestamp":"2020-01-02T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2020-11-10T04:09:51.332Z\",\"CreateTime\":\"2020-11-10T04:09:51.332Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$top=2&$skip=2"}, [
  'Content-Length',
  '525',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'edd8d12e-b53b-484f-b356-127a2f26be7b',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  'edd8d12e-b53b-484f-b356-127a2f26be7b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-03T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-11-04T22:34:42.412Z\",\"UpdateTime\":\"2020-11-04T22:34:42.412Z\"}"},{"timestamp":"2020-01-04T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-11-04T22:35:42.915Z\",\"UpdateTime\":\"2020-11-04T22:35:42.915Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$top=2&$skip=4"}, [
  'Content-Length',
  '525',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd8cdeadf-c216-4060-825f-decd38a514fd',
  'x-envoy-upstream-service-time',
  '165',
  'apim-request-id',
  'd8cdeadf-c216-4060-825f-decd38a514fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:37 GMT'
]);
