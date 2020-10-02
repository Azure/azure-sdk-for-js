let nock = require('nock');

module.exports.hash = "746a01a11bcb412ea0e6f8c4abb1880d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Cherry Laurel","Dim2":"Amphibian"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$top=2&$skip=2"}, [
  'Content-Length',
  '394',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e4c8f9cb-b099-4873-a127-5a0d5efbf7c0',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'e4c8f9cb-b099-4873-a127-5a0d5efbf7c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 21:01:59 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"African buffalo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Aphid"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$top=2&$skip=4"}, [
  'Content-Length',
  '394',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a344ee91-a24a-45a3-abf5-2e99e8de3f6a',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'a344ee91-a24a-45a3-abf5-2e99e8de3f6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 21:01:59 GMT',
  'Connection',
  'close'
]);
