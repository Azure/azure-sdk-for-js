let nock = require('nock');

module.exports.hash = "7dfa40ad7c8743266d5b9f72b2cbdbdf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '97edd945-c4f5-4291-a52a-716c89ba9ace',
  'x-envoy-upstream-service-time',
  '126',
  'apim-request-id',
  '97edd945-c4f5-4291-a52a-716c89ba9ace',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/d3b7d80f-da42-464d-bfad-3304da188a9f')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: e683e216-8d08-4f76-9d55-f6da3899666a"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4561a9d9-84db-44c5-b182-3d8c8735a37e',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '4561a9d9-84db-44c5-b182-3d8c8735a37e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:26 GMT'
]);
