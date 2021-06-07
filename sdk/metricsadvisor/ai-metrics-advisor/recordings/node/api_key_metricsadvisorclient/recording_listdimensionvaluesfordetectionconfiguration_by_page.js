let nock = require('nock');

module.exports.hash = "e7be098b97d45d25439bf8bcf3bba0e8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Karachi","__SUM__"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b0a05bb8-6c7d-4bc9-9e5f-5baa41cafe1d',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  'b0a05bb8-6c7d-4bc9-9e5f-5baa41cafe1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Los Angeles","Delhi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4df438c9-d04a-4730-8908-89e8bbf7e4b2',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '4df438c9-d04a-4730-8908-89e8bbf7e4b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:14 GMT'
]);
