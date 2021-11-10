let nock = require('nock');

module.exports.hash = "b84f1d34bc0609c704384c7542e61067";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["__SUM__","Shoes Handbags & Sunglasses"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '273',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f44345c-3783-49f2-bef8-1d3bc8d596f6',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '2f44345c-3783-49f2-bef8-1d3bc8d596f6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["Handmade","Office Products"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '262',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bae678da-75fa-4f9d-966d-3f7edd9d1dd0',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'bae678da-75fa-4f9d-966d-3f7edd9d1dd0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:23 GMT'
]);
