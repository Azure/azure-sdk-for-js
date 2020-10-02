let nock = require('nock');

module.exports.hash = "de79c2d04a63729e24e22d3134253a88";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"Dim1"})
  .query(true)
  .reply(200, {"value":["Algerian Fir","Almond"],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e104a24d-63d6-4f35-8cac-a3aad25c1c6d',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  'e104a24d-63d6-4f35-8cac-a3aad25c1c6d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:21 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"Dim1"})
  .query(true)
  .reply(200, {"value":["Aspen","Austrian Pine"],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '207',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aafbd84e-9e32-4c58-80d8-544fca6ff11b',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'aafbd84e-9e32-4c58-80d8-544fca6ff11b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:21 GMT',
  'Connection',
  'close'
]);
