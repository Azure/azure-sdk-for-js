let nock = require('nock');

module.exports.hash = "d779cb343013f1b49aaec722326f19ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/d762bacf-3eca-4fdb-b028-a1b958a8d52b',
  'x-request-id',
  'd32878fb-f7f6-4790-ac0c-277c79729a87',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  'd32878fb-f7f6-4790-ac0c-277c79729a87',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/d762bacf-3eca-4fdb-b028-a1b958a8d52b')
  .reply(200, {"feedbackId":"d762bacf-3eca-4fdb-b028-a1b958a8d52b","createdTime":"2020-11-13T22:02:56.818Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2672f52e-d124-45bb-b2d2-bc33f24a6e2d',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '2672f52e-d124-45bb-b2d2-bc33f24a6e2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:56 GMT'
]);
