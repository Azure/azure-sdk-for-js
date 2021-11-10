let nock = require('nock');

module.exports.hash = "04d8da0dc19b33daafdbf2071cdf3744";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Anomaly","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-07T00:00:00.000Z","value":{"anomalyValue":"NotAnomaly"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/447a16f5-e9fb-4d31-bef9-295df1b48071',
  'x-request-id',
  '2c294fae-2a85-484c-8eda-7fe9c3cd1a82',
  'x-envoy-upstream-service-time',
  '545',
  'apim-request-id',
  '2c294fae-2a85-484c-8eda-7fe9c3cd1a82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/447a16f5-e9fb-4d31-bef9-295df1b48071')
  .reply(200, {"feedbackId":"447a16f5-e9fb-4d31-bef9-295df1b48071","createdTime":"2021-11-08T09:38:29.203Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Anomaly","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-07T00:00:00Z","value":{"anomalyValue":"NotAnomaly"}}, [
  'Content-Length',
  '393',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '60f22ace-f261-411f-9f7d-5f2f21c6e21c',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '60f22ace-f261-411f-9f7d-5f2f21c6e21c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:29 GMT'
]);
