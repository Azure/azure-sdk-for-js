let nock = require('nock');

module.exports.hash = "991a2c2b61577b145cee73d333aafa0d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-09-04T00:00:00Z","dimension":{"Dim1":"Cherry","Dim2":"Ape"},"property":{"anomalySeverity":"Low"}},{"timestamp":"2020-09-04T00:00:00Z","dimension":{"Dim1":"Common Lime","Dim2":"Butterfly"},"property":{"anomalySeverity":"Low"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$top=2&$skip=2"}, [
  'Content-Length',
  '463',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9a83d6d0-ee7f-4bb7-b8b5-8cb4f30441de',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '9a83d6d0-ee7f-4bb7-b8b5-8cb4f30441de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:11 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-09-04T00:00:00Z","dimension":{"Dim1":"Common Ash","Dim2":"Anaconda"},"property":{"anomalySeverity":"Low"}},{"timestamp":"2020-09-04T00:00:00Z","dimension":{"Dim1":"Bastard Service Tree","Dim2":"Arctic Wolf"},"property":{"anomalySeverity":"Low"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$top=2&$skip=4"}, [
  'Content-Length',
  '483',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0f11eba1-c82b-4739-b5d7-75349f07bb84',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '0f11eba1-c82b-4739-b5d7-75349f07bb84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:11 GMT',
  'Connection',
  'close'
]);
