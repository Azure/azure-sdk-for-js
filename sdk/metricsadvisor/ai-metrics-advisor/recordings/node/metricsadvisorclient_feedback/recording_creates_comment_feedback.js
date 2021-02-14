let nock = require('nock');

module.exports.hash = "c74b7dedb92ab697fb553f1f18c63dad";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/df99bbd6-c746-4967-991a-c469ea7d65be',
  'x-request-id',
  'b08a55d1-136d-4b6a-9e3c-761e8839ff32',
  'x-envoy-upstream-service-time',
  '256',
  'apim-request-id',
  'b08a55d1-136d-4b6a-9e3c-761e8839ff32',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/df99bbd6-c746-4967-991a-c469ea7d65be')
  .reply(200, {"feedbackId":"df99bbd6-c746-4967-991a-c469ea7d65be","createdTime":"2020-11-13T22:02:57.757Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","startTime":null,"endTime":null,"value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '362',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0a0de8ce-7327-44df-a443-d54b8131e073',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '0a0de8ce-7327-44df-a443-d54b8131e073',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:57 GMT'
]);
