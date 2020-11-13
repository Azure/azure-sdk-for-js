let nock = require('nock');

module.exports.hash = "3526125e80b81425f640e08d5a3a111d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/1379eeea-b2db-4bba-9468-bfafe3e56ed2',
  'x-request-id',
  '44b10600-f7a7-4ce6-9958-e7a04ed1940a',
  'x-envoy-upstream-service-time',
  '387',
  'apim-request-id',
  '44b10600-f7a7-4ce6-9958-e7a04ed1940a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/1379eeea-b2db-4bba-9468-bfafe3e56ed2')
  .reply(200, {"feedbackId":"1379eeea-b2db-4bba-9468-bfafe3e56ed2","createdTime":"2020-11-13T19:46:29.535Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ad938726-43eb-4c18-b3e0-88a8834c147e',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'ad938726-43eb-4c18-b3e0-88a8834c147e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:29 GMT'
]);
