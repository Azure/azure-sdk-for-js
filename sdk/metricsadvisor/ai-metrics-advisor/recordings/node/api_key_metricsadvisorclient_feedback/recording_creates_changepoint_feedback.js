let nock = require('nock');

module.exports.hash = "c7345fd7bf5f50e035c5b86364b1888b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/a37e8e33-b977-42f9-aaf2-e5614bcb543a',
  'x-request-id',
  'ce09a773-60a4-4695-bd4a-bd18b17a6865',
  'x-envoy-upstream-service-time',
  '608',
  'apim-request-id',
  'ce09a773-60a4-4695-bd4a-bd18b17a6865',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/a37e8e33-b977-42f9-aaf2-e5614bcb543a')
  .reply(200, {"feedbackId":"a37e8e33-b977-42f9-aaf2-e5614bcb543a","createdTime":"2021-11-08T09:38:29.998Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '27e94411-b254-4a81-9e87-f6e61b25f54a',
  'x-envoy-upstream-service-time',
  '184',
  'apim-request-id',
  '27e94411-b254-4a81-9e87-f6e61b25f54a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:30 GMT'
]);
