let nock = require('nock');

module.exports.hash = "13dba5b5733d032b6f2a014aaecedb97";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .reply(200, {"value":["__SUM__","Electronics (Accessories)","Electronics (Consumer)","Grocery & Gourmet Food","Handmade","Home & Garden","Office Products","Shoes Handbags & Sunglasses"]}, [
  'Content-Length',
  '174',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c094b1a4-c360-4064-911c-452b4874b095',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  'c094b1a4-c360-4064-911c-452b4874b095',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:44 GMT'
]);
