let nock = require('nock');

module.exports.hash = "245355127474a82348bfd6e169bccfd4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3475f225-4b50-4a42-a12a-79779cec4abb')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'af05ab58-c12f-4f49-9bfd-c663789457c4',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  'af05ab58-c12f-4f49-9bfd-c663789457c4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/3475f225-4b50-4a42-a12a-79779cec4abb')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 1ae48717-993f-4cca-bd21-de37ea5227cb"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1ae48717-993f-4cca-bd21-de37ea5227cb',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  '1ae48717-993f-4cca-bd21-de37ea5227cb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:36 GMT'
]);
