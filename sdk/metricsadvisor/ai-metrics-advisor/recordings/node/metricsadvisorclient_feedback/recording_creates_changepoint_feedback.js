let nock = require('nock');

module.exports.hash = "d779cb343013f1b49aaec722326f19ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/b5a8181c-7df2-4c1c-ba1c-47d7f47b55e9',
  'x-request-id',
  '7e6636de-da37-4fe7-a99f-fcb99ffcd986',
  'x-envoy-upstream-service-time',
  '307',
  'apim-request-id',
  '7e6636de-da37-4fe7-a99f-fcb99ffcd986',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/b5a8181c-7df2-4c1c-ba1c-47d7f47b55e9')
  .reply(200, {"feedbackId":"b5a8181c-7df2-4c1c-ba1c-47d7f47b55e9","createdTime":"2020-11-13T21:54:26.029Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '894b328f-e6f7-4a0d-b832-b00aaa074487',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '894b328f-e6f7-4a0d-b832-b00aaa074487',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:25 GMT'
]);
