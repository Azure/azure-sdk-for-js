let nock = require('nock');

module.exports.hash = "9ab3076957683b48569a28e284963757";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/6addc3f7-68a6-4cea-886f-f909ff2b498f',
  'x-request-id',
  '8fca28da-49e1-4c4c-8aa1-d6eba5d0df57',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  '8fca28da-49e1-4c4c-8aa1-d6eba5d0df57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/6addc3f7-68a6-4cea-886f-f909ff2b498f')
  .reply(200, {"feedbackId":"6addc3f7-68a6-4cea-886f-f909ff2b498f","createdTime":"2021-06-02T07:08:02.028Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ba083514-2529-42c4-86c2-506850be4dfa',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'ba083514-2529-42c4-86c2-506850be4dfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:08:02 GMT'
]);
