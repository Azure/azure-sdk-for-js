let nock = require('nock');

module.exports.hash = "eb752a5437d876fa419f00da84ae3002";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-01T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.366Z\",\"CreateTime\":\"2021-04-07T22:33:32.366Z\"}"},{"timestamp":"2020-01-02T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7228d282-ffd0-4742-803c-a423057b46c6',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '7228d282-ffd0-4742-803c-a423057b46c6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-01-03T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"},{"timestamp":"2020-01-04T00:00:00Z","status":"Succeeded","message":"{\"UpdateTime\":\"2021-04-07T22:33:32.372Z\",\"CreateTime\":\"2021-04-07T22:33:32.372Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25db8931-4a52-4162-997f-c82b709e1c58',
  'x-envoy-upstream-service-time',
  '195',
  'apim-request-id',
  '25db8931-4a52-4162-997f-c82b709e1c58',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:33 GMT'
]);
