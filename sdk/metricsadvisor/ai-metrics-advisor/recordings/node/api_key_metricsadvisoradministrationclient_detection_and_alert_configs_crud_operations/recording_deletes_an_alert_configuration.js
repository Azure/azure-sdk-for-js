let nock = require('nock');

module.exports.hash = "92461016236353b27959e8d6297a3efe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '88066703-a600-4e41-88ad-1cd34a213f1a',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '88066703-a600-4e41-88ad-1cd34a213f1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/349b1b8c-06e1-459b-8a6b-7c8ffca526b6')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: a2a7dea9-b6ae-45f9-897c-b571b30b0677"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '43ab073e-c79d-4ef6-926a-3261557bf674',
  'x-envoy-upstream-service-time',
  '143',
  'apim-request-id',
  '43ab073e-c79d-4ef6-926a-3261557bf674',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:18 GMT'
]);
