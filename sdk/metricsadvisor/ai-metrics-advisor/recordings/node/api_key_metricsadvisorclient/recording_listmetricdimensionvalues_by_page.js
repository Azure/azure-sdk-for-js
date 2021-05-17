let nock = require('nock');

module.exports.hash = "01695d3637fe7f888883808dddcfa2db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Abidjan","Ahmadabad"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '210',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3d8a533e-aa32-49d1-9a92-96320bf491d3',
  'x-envoy-upstream-service-time',
  '180',
  'apim-request-id',
  '3d8a533e-aa32-49d1-9a92-96320bf491d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Alexandria","Ankara"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '210',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '11d8c42e-0c24-49ea-98b2-b9cda058bad0',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '11d8c42e-0c24-49ea-98b2-b9cda058bad0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:25 GMT'
]);
