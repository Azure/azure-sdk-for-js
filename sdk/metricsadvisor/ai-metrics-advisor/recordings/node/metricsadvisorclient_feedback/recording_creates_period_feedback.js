let nock = require('nock');

module.exports.hash = "3526125e80b81425f640e08d5a3a111d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/05558007-515c-400d-b2a9-ab2568609746',
  'x-request-id',
  '85c367bc-a0eb-4e0f-9ec3-85156ee3b6b3',
  'x-envoy-upstream-service-time',
  '314',
  'apim-request-id',
  '85c367bc-a0eb-4e0f-9ec3-85156ee3b6b3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/05558007-515c-400d-b2a9-ab2568609746')
  .reply(200, {"feedbackId":"05558007-515c-400d-b2a9-ab2568609746","createdTime":"2020-11-13T22:02:57.305Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '55b8076e-a11a-4e55-8e11-aa195f72226b',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '55b8076e-a11a-4e55-8e11-aa195f72226b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:56 GMT'
]);
