let nock = require('nock');

module.exports.hash = "9ab3076957683b48569a28e284963757";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/3d16a90c-9fac-41b7-a1b2-55af5b7a08b6',
  'x-request-id',
  '107dee2a-87fa-4dd0-9771-ba28840ded2e',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  '107dee2a-87fa-4dd0-9771-ba28840ded2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/3d16a90c-9fac-41b7-a1b2-55af5b7a08b6')
  .reply(200, {"feedbackId":"3d16a90c-9fac-41b7-a1b2-55af5b7a08b6","createdTime":"2021-01-15T08:41:28.653Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '72970d49-52d7-4f75-b494-b0bd211b5592',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '72970d49-52d7-4f75-b494-b0bd211b5592',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:28 GMT'
]);
