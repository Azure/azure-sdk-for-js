let nock = require('nock');

module.exports.hash = "366f7c412fa8555bd7a058782fcf69f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-08-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '34ecb531-b4ef-42f6-b99f-82ddce4d8fca',
  'x-envoy-upstream-service-time',
  '196',
  'apim-request-id',
  '34ecb531-b4ef-42f6-b99f-82ddce4d8fca',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2021-01-01T00:00:00.000Z","endTime":"2021-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-08-13T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"},{"timestamp":"2021-08-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2021-09-07T23:45:37.533Z\",\"UpdateTime\":\"2021-09-07T23:45:37.533Z\"}"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '533',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a6241e00-0e87-43ec-8086-9818329a3b38',
  'x-envoy-upstream-service-time',
  '189',
  'apim-request-id',
  'a6241e00-0e87-43ec-8086-9818329a3b38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:28 GMT'
]);
