let nock = require('nock');

module.exports.hash = "30aa1c20df7a83e5962e7a8e0c310ffc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Miami","category":"Office Products"},"property":{"anomalySeverity":"Medium","value":34975,"expectedValue":32994.38317904984}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Istanbul","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":0,"expectedValue":3.847182887027481}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '603',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1b1390f5-25ca-44f1-886c-c82075a5af12',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  '1b1390f5-25ca-44f1-886c-c82075a5af12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.0667363729590091}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Karachi","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Medium","value":3799.2,"expectedValue":290.17563836248905}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '609',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '717faf29-4384-4053-b09d-c720a5a865ed',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '717faf29-4384-4053-b09d-c720a5a865ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:38 GMT'
]);
