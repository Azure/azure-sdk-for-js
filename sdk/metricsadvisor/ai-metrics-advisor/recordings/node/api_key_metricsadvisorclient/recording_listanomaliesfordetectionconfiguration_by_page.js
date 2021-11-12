let nock = require('nock');

module.exports.hash = "30aa1c20df7a83e5962e7a8e0c310ffc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Istanbul","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":0,"expectedValue":0.2226051564570372}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"__SUM__"},"property":{"anomalySeverity":"Medium","value":900770.6000000001,"expectedValue":1645160.8108448838}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '609',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'acb603a7-4bb7-49b2-b1ed-ac61dbf832df',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  'acb603a7-4bb7-49b2-b1ed-ac61dbf832df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.2799398290216903}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"__SUM__","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":12.6,"expectedValue":7.66378372884321}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '605',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9dbaf880-b188-4fa6-9856-58909d3817b4',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '9dbaf880-b188-4fa6-9856-58909d3817b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:14 GMT'
]);
