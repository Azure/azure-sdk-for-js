let nock = require('nock');

module.exports.hash = "c74b7dedb92ab697fb553f1f18c63dad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f5e675f8-1b17-45c8-87c3-e1c90e875957',
  'x-request-id',
  '07b555b3-8846-47ce-bb42-799592b6f7f5',
  'x-envoy-upstream-service-time',
  '297',
  'apim-request-id',
  '07b555b3-8846-47ce-bb42-799592b6f7f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f5e675f8-1b17-45c8-87c3-e1c90e875957')
  .reply(200, {"feedbackId":"f5e675f8-1b17-45c8-87c3-e1c90e875957","createdTime":"2020-11-12T23:10:49.918Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9e0e16c0-9e6c-4158-b34f-4fa1e22b8998',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '9e0e16c0-9e6c-4158-b34f-4fa1e22b8998',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:49 GMT'
]);
