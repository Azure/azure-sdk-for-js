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
  '20cdd266-36af-4c94-b78e-aa35e9f22d82',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  '20cdd266-36af-4c94-b78e-aa35e9f22d82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:21 GMT'
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
  '27bce65c-4663-4fc3-8425-0296ea65aa1e',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  '27bce65c-4663-4fc3-8425-0296ea65aa1e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:22 GMT'
]);
