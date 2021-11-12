let nock = require('nock');

module.exports.hash = "a72c7e715903e51f1c1be9181bb361c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["__SUM__","Electronics (Accessories)"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '226',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0f7ff195-c14e-4e83-81fa-fdfae896e8e4',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '0f7ff195-c14e-4e83-81fa-fdfae896e8e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["Electronics (Consumer)","Grocery & Gourmet Food"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '238',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7d4cd931-90f1-4cc8-861e-216957d1c1b9',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '7d4cd931-90f1-4cc8-861e-216957d1c1b9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:25 GMT'
]);
