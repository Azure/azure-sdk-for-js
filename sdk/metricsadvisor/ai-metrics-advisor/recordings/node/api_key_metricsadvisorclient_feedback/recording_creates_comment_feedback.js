let nock = require('nock');

module.exports.hash = "8948136c6d03be4d7f6bf4b239c40478";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/c60aebc3-d3be-4fe9-920f-cc64eca72383',
  'x-request-id',
  'c8ffefc5-78e6-4a68-8fa7-4b7935432233',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  'c8ffefc5-78e6-4a68-8fa7-4b7935432233',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/c60aebc3-d3be-4fe9-920f-cc64eca72383')
  .reply(200, {"feedbackId":"c60aebc3-d3be-4fe9-920f-cc64eca72383","createdTime":"2022-01-20T00:58:49.567Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'adae8351-aa35-4ba2-988b-1df7c72d69d7',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'adae8351-aa35-4ba2-988b-1df7c72d69d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:49 GMT'
]);
