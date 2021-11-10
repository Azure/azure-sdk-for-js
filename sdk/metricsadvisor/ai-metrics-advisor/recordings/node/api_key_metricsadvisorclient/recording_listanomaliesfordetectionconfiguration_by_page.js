let nock = require('nock');

module.exports.hash = "30aa1c20df7a83e5962e7a8e0c310ffc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":8.2,"expectedValue":0.11962657062232168}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Karachi","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Medium","value":3799.2,"expectedValue":299.10696511456587}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '610',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fbe2caa6-40ff-458b-a2c3-224c86208424',
  'x-envoy-upstream-service-time',
  '131',
  'apim-request-id',
  'fbe2caa6-40ff-458b-a2c3-224c86208424',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"New York","category":"Electronics (Consumer)"},"property":{"anomalySeverity":"Low","value":84.4,"expectedValue":6.073527005246529}},{"timestamp":"2021-10-31T00:00:00Z","dimension":{"region":"Tianjin","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","value":756713.8,"expectedValue":821548.9344276552}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '616',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ee5b7104-ff51-42db-8c4e-52025c3e3233',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'ee5b7104-ff51-42db-8c4e-52025c3e3233',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:20 GMT'
]);
