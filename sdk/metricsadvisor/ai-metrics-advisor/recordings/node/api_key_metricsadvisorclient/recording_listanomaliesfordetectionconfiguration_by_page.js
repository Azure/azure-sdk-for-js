let nock = require('nock');

module.exports.hash = "612df974f7dedd54885402f36d04985a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Lagos","category":"Grocery & Gourmet Food"},"property":{"anomalySeverity":"Low","value":0.4,"expectedValue":0.11447198690121768}},{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Tianjin","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":0,"expectedValue":0.46284949225770355}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '602',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b801a36c-398d-4ba1-93f8-246d8d5598a0',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  'b801a36c-398d-4ba1-93f8-246d8d5598a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Hyderabad","category":"Software & Computer Games"},"property":{"anomalySeverity":"Low","value":1.4,"expectedValue":0.4998854052597048}},{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Los Angeles","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":0.8,"expectedValue":1.2623167926434093}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '611',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7c332920-67a0-4217-a3c3-21cda00697ed',
  'x-envoy-upstream-service-time',
  '163',
  'apim-request-id',
  '7c332920-67a0-4217-a3c3-21cda00697ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:50 GMT'
]);
