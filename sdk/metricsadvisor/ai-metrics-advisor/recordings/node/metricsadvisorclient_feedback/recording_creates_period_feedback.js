let nock = require('nock');

module.exports.hash = "3526125e80b81425f640e08d5a3a111d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/a4b0da07-3b80-41bb-9fe5-706dd21cd7b0',
  'x-request-id',
  'b03670a8-d2fd-44e6-a272-79538e385be0',
  'x-envoy-upstream-service-time',
  '353',
  'apim-request-id',
  'b03670a8-d2fd-44e6-a272-79538e385be0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/a4b0da07-3b80-41bb-9fe5-706dd21cd7b0')
  .reply(200, {"feedbackId":"a4b0da07-3b80-41bb-9fe5-706dd21cd7b0","createdTime":"2020-11-13T01:14:39.806Z","userPrincipal":"kaghiya@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"city":"Cairo","category":"Home & Garden"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '336',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a95b1e3b-aa59-4442-9c53-5c5dc0599597',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'a95b1e3b-aa59-4442-9c53-5c5dc0599597',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:39 GMT'
]);
