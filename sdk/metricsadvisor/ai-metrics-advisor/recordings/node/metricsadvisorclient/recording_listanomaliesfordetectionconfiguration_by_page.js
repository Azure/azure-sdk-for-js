let nock = require('nock');

module.exports.hash = "6f834c28f110902cd721f8979795867a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Lagos","category":"Grocery & Gourmet Food"},"property":{"anomalySeverity":"Low"}},{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Tianjin","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$top=2&$skip=2"}, [
  'Content-Length',
  '498',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f356f166-e3fe-416d-b917-19473c3b3a1e',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'f356f166-e3fe-416d-b917-19473c3b3a1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Hyderabad","category":"Software & Computer Games"},"property":{"anomalySeverity":"Low"}},{"timestamp":"2020-11-04T00:00:00Z","dimension":{"city":"Los Angeles","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$top=2&$skip=4"}, [
  'Content-Length',
  '509',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e864f005-82b2-4f34-bfba-720fe8d63ca8',
  'x-envoy-upstream-service-time',
  '119',
  'apim-request-id',
  'e864f005-82b2-4f34-bfba-720fe8d63ca8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:14 GMT'
]);
