let nock = require('nock');

module.exports.hash = "7dfa40ad7c8743266d5b9f72b2cbdbdf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8428f53d-edb0-41db-aac8-a8a0d27713b5',
  'x-envoy-upstream-service-time',
  '134',
  'apim-request-id',
  '8428f53d-edb0-41db-aac8-a8a0d27713b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/180377ec-559a-40d1-af6c-2b3d9d5909bf')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: d6d2aee5-4053-40ff-b92a-07b986247a75"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bdf0dec9-9294-4cdd-be02-7aac53e847c2',
  'x-envoy-upstream-service-time',
  '80',
  'apim-request-id',
  'bdf0dec9-9294-4cdd-be02-7aac53e847c2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:43 GMT'
]);
