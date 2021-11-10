let nock = require('nock');

module.exports.hash = "bf2a87f69d6384d228b1824927b8b5c2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","dimensionName":"category"})
  .reply(200, {"value":["__SUM__","Shoes Handbags & Sunglasses","Handmade","Office Products","Home & Garden","Electronics (Consumer)","Electronics (Accessories)","Grocery & Gourmet Food"]}, [
  'Content-Length',
  '174',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '88846933-c87b-46f2-a02d-b4a4685add67',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '88846933-c87b-46f2-a02d-b4a4685add67',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:22 GMT'
]);
