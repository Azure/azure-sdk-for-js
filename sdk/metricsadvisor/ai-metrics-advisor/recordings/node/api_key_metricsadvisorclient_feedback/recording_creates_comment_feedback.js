let nock = require('nock');

module.exports.hash = "a8f499eec770cfb0ecbda9095b34bd28";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/4654fe14-25cc-490c-a522-72bf23d3b270',
  'x-request-id',
  'baa6c359-c689-4ef6-a9d6-a0b2c43143ae',
  'x-envoy-upstream-service-time',
  '282',
  'apim-request-id',
  'baa6c359-c689-4ef6-a9d6-a0b2c43143ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:34 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/4654fe14-25cc-490c-a522-72bf23d3b270')
  .reply(200, {"feedbackId":"4654fe14-25cc-490c-a522-72bf23d3b270","createdTime":"2021-05-15T04:10:35.668Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '445d3322-3345-4cd0-944c-c629f7afbd01',
  'x-envoy-upstream-service-time',
  '90',
  'apim-request-id',
  '445d3322-3345-4cd0-944c-c629f7afbd01',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:35 GMT'
]);
