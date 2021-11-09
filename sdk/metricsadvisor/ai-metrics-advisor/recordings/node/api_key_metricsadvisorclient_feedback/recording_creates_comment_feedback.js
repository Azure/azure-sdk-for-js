let nock = require('nock');

module.exports.hash = "6ff0d17bb67055a4ef5add7605c64970";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/0a6ef604-8cb1-48aa-87a7-13b413a6ca03',
  'x-request-id',
  '3ff008df-3a56-4f1c-8569-386ffbe3cd0f',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '3ff008df-3a56-4f1c-8569-386ffbe3cd0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/0a6ef604-8cb1-48aa-87a7-13b413a6ca03')
  .reply(200, {"feedbackId":"0a6ef604-8cb1-48aa-87a7-13b413a6ca03","createdTime":"2021-11-08T09:38:31.415Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '332',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9d05acec-52c7-4887-bdbd-0bef92472678',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '9d05acec-52c7-4887-bdbd-0bef92472678',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:31 GMT'
]);
