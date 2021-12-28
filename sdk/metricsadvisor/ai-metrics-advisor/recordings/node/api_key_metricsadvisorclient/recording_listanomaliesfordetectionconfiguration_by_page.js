let nock = require('nock');

module.exports.hash = "30aa1c20df7a83e5962e7a8e0c310ffc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.08059720961202357}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"__SUM__","category":"Electronics (Accessories)"},"property":{"anomalySeverity":"Low","value":12.6,"expectedValue":114.17942348386997}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '608',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '29914547-36b2-4d89-bff7-9bf5f6411ddc',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '29914547-36b2-4d89-bff7-9bf5f6411ddc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Karachi","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Medium","value":3799.2,"expectedValue":292.12803420060055}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Cairo","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":133.6,"expectedValue":0.00039042653963033904}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '613',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2a449f30-0b96-4333-8120-9c062787a999',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '2a449f30-0b96-4333-8120-9c062787a999',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:40 GMT'
]);
