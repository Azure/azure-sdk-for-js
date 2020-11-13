let nock = require('nock');

module.exports.hash = "61b36bf23d78e349dca62621d938c9de";

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
  '3ab5862a-58da-4e62-8c6f-1b3039ec6a4a',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '3ab5862a-58da-4e62-8c6f-1b3039ec6a4a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:24 GMT'
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
  'c32f609b-ea2b-47c7-89b2-7d9d910a660b',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  'c32f609b-ea2b-47c7-89b2-7d9d910a660b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:24 GMT'
]);
