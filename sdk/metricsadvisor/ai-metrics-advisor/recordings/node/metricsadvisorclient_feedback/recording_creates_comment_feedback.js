let nock = require('nock');

module.exports.hash = "c74b7dedb92ab697fb553f1f18c63dad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/498ae3c9-98b5-442e-893a-9261b5d9c8e5',
  'x-request-id',
  '27f48658-8422-444c-9b99-133b00ebdc03',
  'x-envoy-upstream-service-time',
  '480',
  'apim-request-id',
  '27f48658-8422-444c-9b99-133b00ebdc03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/498ae3c9-98b5-442e-893a-9261b5d9c8e5')
  .reply(200, {"feedbackId":"498ae3c9-98b5-442e-893a-9261b5d9c8e5","createdTime":"2020-11-13T01:14:40.469Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09def378-b861-4dc7-9fd7-48cbf4f9d06e',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  '09def378-b861-4dc7-9fd7-48cbf4f9d06e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:40 GMT'
]);
