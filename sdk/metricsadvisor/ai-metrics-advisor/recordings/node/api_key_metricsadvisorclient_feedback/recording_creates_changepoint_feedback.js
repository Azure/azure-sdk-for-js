let nock = require('nock');

module.exports.hash = "c7345fd7bf5f50e035c5b86364b1888b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/86f5da4c-aaa2-4029-8df7-78eb652590e3',
  'x-request-id',
  '27351fd4-2cc6-46b2-b49e-402795b77b48',
  'x-envoy-upstream-service-time',
  '447',
  'apim-request-id',
  '27351fd4-2cc6-46b2-b49e-402795b77b48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/86f5da4c-aaa2-4029-8df7-78eb652590e3')
  .reply(200, {"feedbackId":"86f5da4c-aaa2-4029-8df7-78eb652590e3","createdTime":"2021-11-10T02:07:30.175Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ba2d8af6-ac3e-4db7-a93b-ccfe8791252b',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  'ba2d8af6-ac3e-4db7-a93b-ccfe8791252b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:29 GMT'
]);
