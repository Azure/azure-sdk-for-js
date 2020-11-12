let nock = require('nock');

module.exports.hash = "72c911859ee3a71fcebd014abdf23aab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Miami","category":"Health & Personal Care"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Rio de Janeiro","category":"Historical & Advertising Collectibles"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Belo Horizonte","category":"Electronics (Consumer)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Kinshasa","category":"Beauty"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Lahore","category":"Shoes Handbags & Sunglasses"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Hong Kong","category":"Electronics (Accessories)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Sao Paulo","category":"Beauty"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Delhi","category":"Books"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Istanbul","category":"Camera & Photo"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Kinshasa","category":"Musical Instruments"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Guangzhou","category":"Jewelry"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Bengaluru","category":"Jewelry"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Kinshasa","category":"Health & Personal Care"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Dallas","category":"Office Products"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Beijing","category":"Electronics (Consumer)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Hyderabad","category":"Handmade"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Kolkata","category":"Electronics (Consumer)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Chicago","category":"Electronics (Accessories)"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Madrid","category":"Industrial & Scientific"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimension":{"city":"Buenos Aires","category":"Outdoors"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/series/query?$top=20&$skip=20"}, [
  'Content-Length',
  '2487',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f8bb03cb-b312-4993-9a06-1bc0aa9ecf26',
  'x-envoy-upstream-service-time',
  '120',
  'apim-request-id',
  'f8bb03cb-b312-4993-9a06-1bc0aa9ecf26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:43 GMT'
]);
