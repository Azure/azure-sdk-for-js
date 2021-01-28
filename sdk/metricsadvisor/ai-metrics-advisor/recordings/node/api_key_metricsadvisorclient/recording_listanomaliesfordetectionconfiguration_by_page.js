let nock = require('nock');

module.exports.hash = "612df974f7dedd54885402f36d04985a";

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
  'b8f6dca8-d5d5-4e7c-a651-40de4fa7a453',
  'x-envoy-upstream-service-time',
  '135',
  'apim-request-id',
  'b8f6dca8-d5d5-4e7c-a651-40de4fa7a453',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:58 GMT'
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
  'a9788a39-4430-4b1d-b80a-716f36169225',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  'a9788a39-4430-4b1d-b80a-716f36169225',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:40:58 GMT'
]);
