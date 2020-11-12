let nock = require('nock');

module.exports.hash = "d779cb343013f1b49aaec722326f19ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/248bf97b-5f5e-41cb-8af6-f2596b99ef3c',
  'x-request-id',
  '6264e4db-44bd-49ff-af61-e3bd0429ea37',
  'x-envoy-upstream-service-time',
  '318',
  'apim-request-id',
  '6264e4db-44bd-49ff-af61-e3bd0429ea37',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:47 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/248bf97b-5f5e-41cb-8af6-f2596b99ef3c')
  .reply(200, {"feedbackId":"248bf97b-5f5e-41cb-8af6-f2596b99ef3c","createdTime":"2020-11-12T23:10:48.68Z","userPrincipal":"kaghiya@microsoft.com","metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '399',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3d69b816-5203-4fdf-a199-2efff6605dc2',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '3d69b816-5203-4fdf-a199-2efff6605dc2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:48 GMT'
]);
