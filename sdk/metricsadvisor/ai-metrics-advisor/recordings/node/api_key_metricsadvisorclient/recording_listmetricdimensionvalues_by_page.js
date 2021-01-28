let nock = require('nock');

module.exports.hash = "01695d3637fe7f888883808dddcfa2db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Abidjan","Ahmadabad"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '202',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c27f7edf-3b53-41d2-9712-a5066c95d8bb',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  'c27f7edf-3b53-41d2-9712-a5066c95d8bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Alexandria","Ankara"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '202',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '70ce1e53-6087-497d-9807-d77ac00297ed',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '70ce1e53-6087-497d-9807-d77ac00297ed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:21 GMT'
]);
