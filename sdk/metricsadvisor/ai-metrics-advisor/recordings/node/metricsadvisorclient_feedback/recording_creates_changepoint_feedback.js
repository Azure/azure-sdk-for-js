let nock = require('nock');

module.exports.hash = "d779cb343013f1b49aaec722326f19ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/726af1b5-a214-44f4-8064-bf1feed6fc12',
  'x-request-id',
  '1441cbdd-e9f7-4076-9b5c-7192805fe2a9',
  'x-envoy-upstream-service-time',
  '354',
  'apim-request-id',
  '1441cbdd-e9f7-4076-9b5c-7192805fe2a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/726af1b5-a214-44f4-8064-bf1feed6fc12')
  .reply(200, {"feedbackId":"726af1b5-a214-44f4-8064-bf1feed6fc12","createdTime":"2020-11-13T19:46:28.921Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9bb720cc-6533-4426-86b8-46ad18acef0c',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '9bb720cc-6533-4426-86b8-46ad18acef0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:28 GMT'
]);
