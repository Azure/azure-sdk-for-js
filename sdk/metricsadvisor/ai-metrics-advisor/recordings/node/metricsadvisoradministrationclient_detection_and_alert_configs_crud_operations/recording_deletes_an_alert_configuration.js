let nock = require('nock');

module.exports.hash = "7dfa40ad7c8743266d5b9f72b2cbdbdf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e97bdf28-f5ad-4717-9ae8-d51a1d3e94a7',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  'e97bdf28-f5ad-4717-9ae8-d51a1d3e94a7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/8c6f9e00-1168-45fc-af60-926124f33085')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 18d50bf7-8634-441b-8d03-de0b55fc7a50"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c2eb57dd-537c-4a47-a11b-4bbc615f06d8',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'c2eb57dd-537c-4a47-a11b-4bbc615f06d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);
