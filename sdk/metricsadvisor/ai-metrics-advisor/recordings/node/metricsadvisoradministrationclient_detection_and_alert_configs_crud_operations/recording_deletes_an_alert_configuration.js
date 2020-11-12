let nock = require('nock');

module.exports.hash = "7dfa40ad7c8743266d5b9f72b2cbdbdf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/e4c85a26-8954-460e-b102-60023d51fd58')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '92691ccf-c951-4743-8ed4-7b8eb0b53f08',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  '92691ccf-c951-4743-8ed4-7b8eb0b53f08',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/e4c85a26-8954-460e-b102-60023d51fd58')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: e6cd50b4-c280-4849-9f7e-4beb7ace949d"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '238b0619-c66f-4fdf-97f6-fd9973f7e71e',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '238b0619-c66f-4fdf-97f6-fd9973f7e71e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:34 GMT'
]);
