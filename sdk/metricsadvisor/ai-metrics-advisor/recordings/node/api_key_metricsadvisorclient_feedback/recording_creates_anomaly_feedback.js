let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f95a6d29-5b94-48d6-bfb6-884b9f567f79',
  'x-request-id',
  '8dd4121f-b5d6-4533-a022-ff8b932aa670',
  'x-envoy-upstream-service-time',
  '442',
  'apim-request-id',
  '8dd4121f-b5d6-4533-a022-ff8b932aa670',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f95a6d29-5b94-48d6-bfb6-884b9f567f79')
  .reply(200, {"feedbackId":"f95a6d29-5b94-48d6-bfb6-884b9f567f79","createdTime":"2021-11-10T02:07:29.517Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f082fc69-4831-4a7f-85da-5b05619f1d7f',
  'x-envoy-upstream-service-time',
  '118',
  'apim-request-id',
  'f082fc69-4831-4a7f-85da-5b05619f1d7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:29 GMT'
]);
