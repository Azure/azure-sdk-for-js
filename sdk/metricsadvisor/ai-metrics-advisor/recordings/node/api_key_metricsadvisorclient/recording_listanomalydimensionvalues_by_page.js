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
  '64e8a4b1-1439-48a8-8aae-9a6610bfd837',
  'x-envoy-upstream-service-time',
  '234',
  'apim-request-id',
  '64e8a4b1-1439-48a8-8aae-9a6610bfd837',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:42 GMT'
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
  'f2c0822a-5dc3-4a9d-9ecd-6bcbed3deb31',
  'x-envoy-upstream-service-time',
  '222',
  'apim-request-id',
  'f2c0822a-5dc3-4a9d-9ecd-6bcbed3deb31',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:42 GMT'
]);
