let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5aee4c62-9733-48e9-a548-8a3b37d2e152')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f1b5b69e-dbbc-4e85-9325-474ed4e075c7',
  'x-envoy-upstream-service-time',
  '94',
  'apim-request-id',
  'f1b5b69e-dbbc-4e85-9325-474ed4e075c7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5aee4c62-9733-48e9-a548-8a3b37d2e152')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 00097642-f9d0-43c2-9ff9-8d8f89b6a75a"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '00097642-f9d0-43c2-9ff9-8d8f89b6a75a',
  'x-envoy-upstream-service-time',
  '89',
  'apim-request-id',
  '00097642-f9d0-43c2-9ff9-8d8f89b6a75a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:59 GMT'
]);
