let nock = require('nock');

module.exports.hash = "74f35e979ec852ea89836b2be434c9e0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f0030a35-af39-4683-9ba7-7eae5677fd15',
  'x-request-id',
  'ba3445e4-fc92-48c0-94f3-0b46ae67ad03',
  'x-envoy-upstream-service-time',
  '472',
  'apim-request-id',
  'ba3445e4-fc92-48c0-94f3-0b46ae67ad03',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f0030a35-af39-4683-9ba7-7eae5677fd15')
  .reply(200, {"feedbackId":"f0030a35-af39-4683-9ba7-7eae5677fd15","createdTime":"2022-01-20T00:58:49.098Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4b71c73c-4859-47ee-94d3-4f86168919de',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '4b71c73c-4859-47ee-94d3-4f86168919de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:48 GMT'
]);
