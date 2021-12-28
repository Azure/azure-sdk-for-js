let nock = require('nock');

module.exports.hash = "2b7c84b7bfa80508336971ea7f82d3b2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"category":"Home & Garden","region":"Cairo"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/38d7a5fa-3ed9-4254-97b2-d0d346b533ed',
  'x-request-id',
  'd79b1ec6-b28d-4663-b299-b09b1bb7f0d3',
  'x-envoy-upstream-service-time',
  '484',
  'apim-request-id',
  'd79b1ec6-b28d-4663-b299-b09b1bb7f0d3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/38d7a5fa-3ed9-4254-97b2-d0d346b533ed')
  .reply(200, {"feedbackId":"38d7a5fa-3ed9-4254-97b2-d0d346b533ed","createdTime":"2021-11-16T00:32:49.952Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"region":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ef1e12a4-6e8c-41bc-8355-d4c8ce05067d',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'ef1e12a4-6e8c-41bc-8355-d4c8ce05067d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:50 GMT'
]);
