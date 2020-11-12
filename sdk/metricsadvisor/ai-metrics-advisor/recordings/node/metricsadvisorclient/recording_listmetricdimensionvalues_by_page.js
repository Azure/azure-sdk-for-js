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
  '8d2e2da2-ac00-4083-9196-a0c08011153b',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '8d2e2da2-ac00-4083-9196-a0c08011153b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:34 GMT'
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
  '49adcc59-b6d7-48b0-9838-1b85d5cc0421',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '49adcc59-b6d7-48b0-9838-1b85d5cc0421',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:34 GMT'
]);
