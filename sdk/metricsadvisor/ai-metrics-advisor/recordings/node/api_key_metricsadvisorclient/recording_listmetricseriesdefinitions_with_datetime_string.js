let nock = require('nock');

module.exports.hash = "09638d4077ae8e9ab5be1e988bcb12f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Miami","category":"Health & Personal Care"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Rio de Janeiro","category":"Historical & Advertising Collectibles"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Belo Horizonte","category":"Electronics (Consumer)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kinshasa","category":"Beauty"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Lahore","category":"Shoes Handbags & Sunglasses"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Hong Kong","category":"Electronics (Accessories)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Sao Paulo","category":"Beauty"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Delhi","category":"Books"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Istanbul","category":"Camera & Photo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kinshasa","category":"Musical Instruments"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Guangzhou","category":"Jewelry"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Bengaluru","category":"Jewelry"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kinshasa","category":"Health & Personal Care"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Dallas","category":"Office Products"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Beijing","category":"Electronics (Consumer)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Hyderabad","category":"Handmade"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kolkata","category":"Electronics (Consumer)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Chicago","category":"Electronics (Accessories)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Madrid","category":"Industrial & Scientific"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Buenos Aires","category":"Outdoors"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$maxpagesize=20&$skip=20"}, [
  'Content-Length',
  '2495',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5410332c-e31c-49a5-bad3-ded233d84322',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '5410332c-e31c-49a5-bad3-ded233d84322',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:57 GMT'
]);
