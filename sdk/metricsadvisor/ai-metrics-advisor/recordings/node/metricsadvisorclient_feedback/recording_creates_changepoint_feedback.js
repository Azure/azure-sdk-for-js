let nock = require('nock');

module.exports.hash = "d779cb343013f1b49aaec722326f19ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"ChangePoint","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-08-05T00:00:00.000Z","value":{"changePointValue":"ChangePoint"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/033a83a9-722e-4dcb-9912-899edcebc6f0',
  'x-request-id',
  '02714cb5-d741-4e2d-9869-c1f47070fb96',
  'x-envoy-upstream-service-time',
  '404',
  'apim-request-id',
  '02714cb5-d741-4e2d-9869-c1f47070fb96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/033a83a9-722e-4dcb-9912-899edcebc6f0')
  .reply(200, {"feedbackId":"033a83a9-722e-4dcb-9912-899edcebc6f0","createdTime":"2020-11-13T01:14:39.221Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"ChangePoint","startTime":"2020-08-05T00:00:00Z","endTime":"2020-08-05T00:00:00Z","value":{"changePointValue":"ChangePoint"}}, [
  'Content-Length',
  '400',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '342428ed-69f9-46d9-86e3-bfdba759be59',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  '342428ed-69f9-46d9-86e3-bfdba759be59',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:38 GMT'
]);
