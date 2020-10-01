let nock = require('nock');

module.exports.hash = "5ac7a388805b4331a80b7ed20e9c56ac";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/feedback/metric', {"feedbackType":"Period","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"value":{"periodType":"AutoDetect","periodValue":4}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/feedback/metric/80f0967f-fdf8-4fd5-99f2-765cb0776c05',
  'x-request-id',
  '5cd08cbb-c36b-4063-8a85-a3c4607fa435',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '5cd08cbb-c36b-4063-8a85-a3c4607fa435',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:14 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/feedback/metric/80f0967f-fdf8-4fd5-99f2-765cb0776c05')
  .reply(200, {"feedbackId":"80f0967f-fdf8-4fd5-99f2-765cb0776c05","createdTime":"2020-09-25T22:12:15.433Z","userPrincipal":"yumeng@microsoft.com","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimensionFilter":{"dimension":{"Dim1":"Common Lime","Dim2":"Ant"}},"feedbackType":"Period","value":{"periodType":"AutoDetect","periodValue":4}}, [
  'Content-Length',
  '327',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f84045cf-3ef6-4ff8-9676-6b3930b2163a',
  'x-envoy-upstream-service-time',
  '44',
  'apim-request-id',
  'f84045cf-3ef6-4ff8-9676-6b3930b2163a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 22:12:15 GMT',
  'Connection',
  'close'
]);
