let nock = require('nock');

module.exports.hash = "14054da5863782c4fc6a8a675748b72d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '5e3aefae-4878-4320-8459-ff51edb85a1f',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '5e3aefae-4878-4320-8459-ff51edb85a1f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/aee13f5c-3bf8-4f7f-afea-bfbe2c9d52af')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 188743af-90cc-44b8-bda8-19bd4f3bd261"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '980c8ded-10cc-4ab8-b47d-f5ee3e749f2c',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '980c8ded-10cc-4ab8-b47d-f5ee3e749f2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 03 May 2021 21:46:18 GMT'
]);
