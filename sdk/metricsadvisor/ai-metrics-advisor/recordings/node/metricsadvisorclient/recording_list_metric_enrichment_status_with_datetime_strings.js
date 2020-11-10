let nock = require('nock');

module.exports.hash = "ebf3b03a01052a6c50065700552ee1ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/status/enrichment/anomalyDetection/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-18T00:00:00.000Z"})
  .reply(200, {"nextLink":null,"value":[{"timestamp":"2020-09-06T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-12T01:29:10.153Z\"}"},{"timestamp":"2020-09-07T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-12T01:33:40.164Z\"}"},{"timestamp":"2020-09-13T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-17T17:27:16.024Z\"}"},{"timestamp":"2020-09-15T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-18T19:53:55.167Z\"}"},{"timestamp":"2020-09-16T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-18T19:43:25.156Z\"}"},{"timestamp":"2020-09-14T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-17T17:27:16.024Z\"}"},{"timestamp":"2020-09-17T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-18T19:53:55.167Z\"}"},{"timestamp":"2020-09-09T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-14T20:48:35.106Z\"}"},{"timestamp":"2020-09-12T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-17T17:27:16.024Z\"}"},{"timestamp":"2020-09-08T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-14T20:53:05.120Z\"}"},{"timestamp":"2020-09-10T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-16T21:22:15.102Z\"}"},{"timestamp":"2020-09-11T00:00:00Z","status":"Succeeded","message":"{\"CreateTime\":\"2020-09-17T17:27:16.024Z\"}"}]}, [
  'Content-Length',
  '1419',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c33dda5b-07a2-4987-9ec7-3f732581e881',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  'c33dda5b-07a2-4987-9ec7-3f732581e881',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 22:55:58 GMT',
  'Connection',
  'close'
]);
