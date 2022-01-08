let nock = require('nock');

module.exports.hash = "d4f6a0d4fb073072eccfefa2ca136f3f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Comment","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"commentValue":"This is a comment"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/549e8d9e-f903-4219-a46b-1e8781500468',
  'x-request-id',
  'cc21e47a-c6d2-462c-a10f-dab72b12a467',
  'x-envoy-upstream-service-time',
  '342',
  'apim-request-id',
  'cc21e47a-c6d2-462c-a10f-dab72b12a467',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 00:08:24 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/549e8d9e-f903-4219-a46b-1e8781500468')
  .reply(200, {"feedbackId":"549e8d9e-f903-4219-a46b-1e8781500468","createdTime":"2022-01-08T00:08:24.84Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Comment","value":{"commentValue":"This is a comment"}}, [
  'Content-Length',
  '331',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9d3b46e7-34f4-41a5-b01c-9fd0a5c6b92a',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '9d3b46e7-34f4-41a5-b01c-9fd0a5c6b92a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 00:08:24 GMT',
  'Connection',
  'close'
]);
