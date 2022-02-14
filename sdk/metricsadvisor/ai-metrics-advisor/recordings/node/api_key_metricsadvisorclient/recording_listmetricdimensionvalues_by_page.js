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
  '4121d95b-39ae-4d71-916f-0ba6e8074d79',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '4121d95b-39ae-4d71-916f-0ba6e8074d79',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:44 GMT'
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
  '071631ea-e20a-4262-939e-980f981a36e0',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '071631ea-e20a-4262-939e-980f981a36e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:44 GMT'
]);
