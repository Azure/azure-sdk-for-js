let nock = require('nock');

module.exports.hash = "51177733b5ca8e234a97f82e718e5a92";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-18T00:00:00.000Z"})
  .query(true)
  .reply(200, {"nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$top=2&$skip=2","value":[{"timestamp":"2020-09-06T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-12T01:29:10.153Z\"}"},{"timestamp":"2020-09-07T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-12T01:33:40.164Z\"}"}]}, [
  'Content-Length',
  '439',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4341a228-fbae-40a0-b6a4-d9c50d2c9568',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '4341a228-fbae-40a0-b6a4-d9c50d2c9568',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 22:55:58 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-18T00:00:00.000Z"})
  .query(true)
  .reply(200, {"nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query?$top=2&$skip=4","value":[{"timestamp":"2020-09-08T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-14T20:53:05.120Z\"}"},{"timestamp":"2020-09-09T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-14T20:48:35.106Z\"}"}]}, [
  'Content-Length',
  '439',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1dacd1b7-bde0-451a-a7b9-3f80f8fa3734',
  'x-envoy-upstream-service-time',
  '159',
  'apim-request-id',
  '1dacd1b7-bde0-451a-a7b9-3f80f8fa3734',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 22:56:00 GMT',
  'Connection',
  'close'
]);
