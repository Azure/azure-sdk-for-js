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
  'a0c1450c-bb1f-491c-bed8-c5290eea932d',
  'x-envoy-upstream-service-time',
  '153',
  'apim-request-id',
  'a0c1450c-bb1f-491c-bed8-c5290eea932d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:18 GMT'
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
  'aab8aafe-969a-49d8-afe1-0baed1dd2ba2',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  'aab8aafe-969a-49d8-afe1-0baed1dd2ba2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:18 GMT'
]);
