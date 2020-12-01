let nock = require('nock');

module.exports.hash = "fb2090479acac8aeb6b9bd91639dfb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Miami","category":"Health & Personal Care"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Rio de Janeiro","category":"Historical & Advertising Collectibles"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$top=2&$skip=2"}, [
  'Content-Length',
  '435',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8ece50a2-bcfa-4e36-b1b3-331af5018206',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '8ece50a2-bcfa-4e36-b1b3-331af5018206',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Belo Horizonte","category":"Electronics (Consumer)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kinshasa","category":"Beauty"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$top=2&$skip=4"}, [
  'Content-Length',
  '407',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd7065178-430d-4d01-addb-fcbb5a001603',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'd7065178-430d-4d01-addb-fcbb5a001603',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:51 GMT'
]);
