let nock = require('nock');

module.exports.hash = "fb2090479acac8aeb6b9bd91639dfb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Miami","category":"Health & Personal Care"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Rio de Janeiro","category":"Historical & Advertising Collectibles"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query?$top=2&$skip=2"}, [
  'Content-Length',
  '435',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bbf9aff1-05f3-4241-a669-984f3db8d38b',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  'bbf9aff1-05f3-4241-a669-984f3db8d38b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Belo Horizonte","category":"Electronics (Consumer)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Kinshasa","category":"Beauty"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query?$top=2&$skip=4"}, [
  'Content-Length',
  '407',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2d43db37-f3c3-4c0b-971e-81df682e4bf5',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '2d43db37-f3c3-4c0b-971e-81df682e4bf5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 22:18:34 GMT'
]);
