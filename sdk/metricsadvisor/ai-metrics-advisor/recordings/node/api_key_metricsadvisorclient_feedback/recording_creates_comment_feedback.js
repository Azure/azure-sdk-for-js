let nock = require('nock');

module.exports.hash = "6ff0d17bb67055a4ef5add7605c64970";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f29c7d01-ff06-4548-9199-be5a7ff7c755',
  'x-request-id',
  '6449702e-3792-4112-8242-cbfade2e3c48',
  'x-envoy-upstream-service-time',
  '319',
  'apim-request-id',
  '6449702e-3792-4112-8242-cbfade2e3c48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f29c7d01-ff06-4548-9199-be5a7ff7c755')
  .reply(200, {"feedbackId":"f29c7d01-ff06-4548-9199-be5a7ff7c755","createdTime":"2021-11-16T00:32:50.465Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b1f48d37-766b-42ac-bfcb-4181b86e7845',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'b1f48d37-766b-42ac-bfcb-4181b86e7845',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:50 GMT'
]);
