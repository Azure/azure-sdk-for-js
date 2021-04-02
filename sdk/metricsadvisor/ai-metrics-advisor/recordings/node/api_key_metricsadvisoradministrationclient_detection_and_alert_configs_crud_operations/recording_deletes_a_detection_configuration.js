let nock = require('nock');

module.exports.hash = "676ef4430cdcbaf412a9dca197b73b94";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/854f1125-f1f7-44fa-ba16-8c5be659b8b9')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '91b3db65-afc9-4a2f-bba0-5be4836c7390',
  'x-envoy-upstream-service-time',
  '214',
  'apim-request-id',
  '91b3db65-afc9-4a2f-bba0-5be4836c7390',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/854f1125-f1f7-44fa-ba16-8c5be659b8b9')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 0b11e5db-083a-4078-a99a-6f1463fc9a69"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b09b443f-a223-4a29-9f7b-9117aeba3f52',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  'b09b443f-a223-4a29-9f7b-9117aeba3f52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:27 GMT'
]);
