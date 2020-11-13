let nock = require('nock');

module.exports.hash = "c74b7dedb92ab697fb553f1f18c63dad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/c35d82bd-02e3-4c57-9de0-03c560dbb8b4',
  'x-request-id',
  'adb06898-63b6-4013-a36c-e1bf66fa4ec9',
  'x-envoy-upstream-service-time',
  '252',
  'apim-request-id',
  'adb06898-63b6-4013-a36c-e1bf66fa4ec9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/c35d82bd-02e3-4c57-9de0-03c560dbb8b4')
  .reply(200, {"feedbackId":"c35d82bd-02e3-4c57-9de0-03c560dbb8b4","createdTime":"2020-11-13T21:54:26.919Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1d0a31e5-1e7b-45a0-a3e0-db7c5799fbd8',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  '1d0a31e5-1e7b-45a0-a3e0-db7c5799fbd8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:26 GMT'
]);
