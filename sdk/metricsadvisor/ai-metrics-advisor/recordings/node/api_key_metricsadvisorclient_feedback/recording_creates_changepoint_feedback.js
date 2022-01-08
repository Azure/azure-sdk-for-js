let nock = require('nock');

module.exports.hash = "c483c67bcedcb86cc4867a43ea01e0e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/f1d080c6-b258-4b96-ba7c-747ed17585b3',
  'x-request-id',
  '08b15645-3f2e-42df-8412-39992a6be671',
  'x-envoy-upstream-service-time',
  '512',
  'apim-request-id',
  '08b15645-3f2e-42df-8412-39992a6be671',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/f1d080c6-b258-4b96-ba7c-747ed17585b3')
  .reply(200, {"feedbackId":"f1d080c6-b258-4b96-ba7c-747ed17585b3","createdTime":"2022-01-08T02:16:31.539Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '485a93cb-44cf-4cda-a6de-8c4d5bd336ec',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '485a93cb-44cf-4cda-a6de-8c4d5bd336ec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:16:31 GMT'
]);
