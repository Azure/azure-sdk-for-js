let nock = require('nock');

module.exports.hash = "a8f499eec770cfb0ecbda9095b34bd28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/3bf0d2e2-e9ec-4c19-ad14-f92ab938e0bd',
  'x-request-id',
  '680d9ff4-3bfe-4fb3-8b67-873cb5c09102',
  'x-envoy-upstream-service-time',
  '391',
  'apim-request-id',
  '680d9ff4-3bfe-4fb3-8b67-873cb5c09102',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:54:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/3bf0d2e2-e9ec-4c19-ad14-f92ab938e0bd')
  .reply(200, {"feedbackId":"3bf0d2e2-e9ec-4c19-ad14-f92ab938e0bd","createdTime":"2021-04-27T06:54:05.725Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bbd3b952-4491-4ed1-a154-bf1bf51031ea',
  'x-envoy-upstream-service-time',
  '227',
  'apim-request-id',
  'bbd3b952-4491-4ed1-a154-bf1bf51031ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 27 Apr 2021 06:54:05 GMT'
]);
