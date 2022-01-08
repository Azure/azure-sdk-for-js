let nock = require('nock');

module.exports.hash = "f5aae12f1d0ddc6bd2f382d8aabc6198";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2021-01-05T00:00:00.000Z","endTime":"2021-11-05T00:00:00.000Z","dimensionName":"category"})
  .reply(200, {"value":["__SUM__","Shoes Handbags & Sunglasses","Handmade","Office Products","Home & Garden","Electronics (Consumer)","Electronics (Accessories)","Grocery & Gourmet Food"]}, [
  'Content-Length',
  '174',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ec47b78a-d7bf-4b8d-8601-0fd6417bc618',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'ec47b78a-d7bf-4b8d-8601-0fd6417bc618',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:25 GMT'
]);
