let nock = require('nock');

module.exports.hash = "8948136c6d03be4d7f6bf4b239c40478";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/04d83f36-bd81-4c19-97bf-6afedd63b71d',
  'x-request-id',
  '67959d02-94a0-4211-b7d1-5bf4a3e16d41',
  'x-envoy-upstream-service-time',
  '322',
  'apim-request-id',
  '67959d02-94a0-4211-b7d1-5bf4a3e16d41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:32 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/04d83f36-bd81-4c19-97bf-6afedd63b71d')
  .reply(200, {"feedbackId":"04d83f36-bd81-4c19-97bf-6afedd63b71d","createdTime":"2022-01-08T02:16:32.732Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cbf2a930-742f-40ff-9eba-c0a1c3366c40',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  'cbf2a930-742f-40ff-9eba-c0a1c3366c40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:32 GMT'
]);
