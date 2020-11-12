let nock = require('nock');

module.exports.hash = "61b36bf23d78e349dca62621d938c9de";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Abidjan","Ahmadabad"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '202',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '71d07721-e9c3-4fde-82c3-cc5bbb9d65f7',
  'x-envoy-upstream-service-time',
  '95',
  'apim-request-id',
  '71d07721-e9c3-4fde-82c3-cc5bbb9d65f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query', {"dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Alexandria","Ankara"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '202',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e4ada2ed-61c6-4b09-8c46-f09a55e0a668',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  'e4ada2ed-61c6-4b09-8c46-f09a55e0a668',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:44 GMT'
]);
