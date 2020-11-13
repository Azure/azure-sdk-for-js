let nock = require('nock');

module.exports.hash = "c74b7dedb92ab697fb553f1f18c63dad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/589b848e-24aa-4e18-8bfe-c31d5cb6793d',
  'x-request-id',
  '1c013afe-2a2d-46fd-96f0-1c4e9ffe43b2',
  'x-envoy-upstream-service-time',
  '411',
  'apim-request-id',
  '1c013afe-2a2d-46fd-96f0-1c4e9ffe43b2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/589b848e-24aa-4e18-8bfe-c31d5cb6793d')
  .reply(200, {"feedbackId":"589b848e-24aa-4e18-8bfe-c31d5cb6793d","createdTime":"2020-11-13T19:46:30.322Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '75414cd7-a03f-48f5-a096-9be83756378e',
  'x-envoy-upstream-service-time',
  '138',
  'apim-request-id',
  '75414cd7-a03f-48f5-a096-9be83756378e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:30 GMT'
]);
