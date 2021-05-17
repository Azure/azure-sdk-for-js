let nock = require('nock');

module.exports.hash = "9ab3076957683b48569a28e284963757";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f79d2765-35d0-44d6-91f1-6c3023b2a99a',
  'x-request-id',
  'ca073248-8522-4a70-8eea-faee0aca8fb1',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  'ca073248-8522-4a70-8eea-faee0aca8fb1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f79d2765-35d0-44d6-91f1-6c3023b2a99a')
  .reply(200, {"feedbackId":"f79d2765-35d0-44d6-91f1-6c3023b2a99a","createdTime":"2021-05-15T04:10:34.77Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '399',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '600cb622-753d-4972-a681-4e647235d7c3',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '600cb622-753d-4972-a681-4e647235d7c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:34 GMT'
]);
