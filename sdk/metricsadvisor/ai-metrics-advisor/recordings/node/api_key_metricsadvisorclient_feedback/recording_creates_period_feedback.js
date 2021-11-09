let nock = require('nock');

module.exports.hash = "2b7c84b7bfa80508336971ea7f82d3b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/9fb883b9-ead0-4e81-8269-f138f85d113a',
  'x-request-id',
  '2762924a-83eb-4c80-a8ea-c8aded8f2db0',
  'x-envoy-upstream-service-time',
  '572',
  'apim-request-id',
  '2762924a-83eb-4c80-a8ea-c8aded8f2db0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/9fb883b9-ead0-4e81-8269-f138f85d113a')
  .reply(200, {"feedbackId":"9fb883b9-ead0-4e81-8269-f138f85d113a","createdTime":"2021-11-08T09:38:30.849Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b20fb03d-aaba-4990-b9ed-1067bb12bcaf',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'b20fb03d-aaba-4990-b9ed-1067bb12bcaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:30 GMT'
]);
