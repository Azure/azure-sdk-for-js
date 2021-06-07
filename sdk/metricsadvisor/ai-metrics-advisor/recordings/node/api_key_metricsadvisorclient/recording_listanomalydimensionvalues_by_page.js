let nock = require('nock');

module.exports.hash = "3f755d2f51e43a27e2d1fd6888eae793";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["__SUM__","Karachi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '253',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2337415d-8b2f-4760-bd59-187d2c520b69',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '2337415d-8b2f-4760-bd59-187d2c520b69',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Los Angeles","Delhi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '255',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2a51cbc9-4f28-4dd5-83ea-9c3471934c0e',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '2a51cbc9-4f28-4dd5-83ea-9c3471934c0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:54 GMT'
]);
