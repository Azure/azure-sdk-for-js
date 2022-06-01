let nock = require('nock');

module.exports.hash = "c483c67bcedcb86cc4867a43ea01e0e1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"startTime":"2021-08-05T00:00:00.000Z","endTime":"2021-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/14349fda-45d8-4b68-92f9-21686e84bed7',
  'x-request-id',
  'dd61fa71-24a6-486c-b9c1-f1e9a09025d7',
  'x-envoy-upstream-service-time',
  '468',
  'apim-request-id',
  'dd61fa71-24a6-486c-b9c1-f1e9a09025d7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/14349fda-45d8-4b68-92f9-21686e84bed7')
  .reply(200, {"feedbackId":"14349fda-45d8-4b68-92f9-21686e84bed7","createdTime":"2022-01-20T00:58:48.415Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2021-08-05T00:00:00Z","endTime":"2021-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6aff62c3-0bf4-497b-9bfe-4277069cb7c2',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  '6aff62c3-0bf4-497b-9bfe-4277069cb7c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:48 GMT'
]);
