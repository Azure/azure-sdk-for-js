let nock = require('nock');

module.exports.hash = "8948136c6d03be4d7f6bf4b239c40478";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/fcdd6188-bc16-454f-957e-514661256435',
  'x-request-id',
  '3ea48501-79c6-4dab-ba4a-be70de8caaf2',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  '3ea48501-79c6-4dab-ba4a-be70de8caaf2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 01:04:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/fcdd6188-bc16-454f-957e-514661256435')
  .reply(200, {"feedbackId":"fcdd6188-bc16-454f-957e-514661256435","createdTime":"2022-01-08T01:04:43.17Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '331',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f9ba7036-655e-4471-8d0a-72cbfde70040',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  'f9ba7036-655e-4471-8d0a-72cbfde70040',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 01:04:42 GMT'
]);
