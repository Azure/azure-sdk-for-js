let nock = require('nock');

module.exports.hash = "67e16e6f5bb6240e102c5f7b8e69b91c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Cherry Laurel","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"African buffalo"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Aphid"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Anteater"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Cabbage Palm","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Alpaca"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Blackthorn","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Angelfish"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Beech","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Caucasian Fir","Dim2":"Amphibian"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Alligator"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Beetle"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Animals by number of neurons"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Aardwolf"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Animals by size"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"African leopard"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Bear"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"Dim1":"Common Lime","Dim2":"Antelope"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$top=20&$skip=20"}, [
  'Content-Length',
  '2320',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5a5210be-f25c-4965-904d-bfb7443ece63',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '5a5210be-f25c-4965-904d-bfb7443ece63',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 21:01:57 GMT',
  'Connection',
  'close'
]);
