let nock = require('nock');

module.exports.hash = "14054da5863782c4fc6a8a675748b72d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '50bbd0de-f0f1-4401-ab49-a332ab3e08a0',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  '50bbd0de-f0f1-4401-ab49-a332ab3e08a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/d0d157b8-8b45-4f84-9129-fda310802e17')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: 2909c8f3-678b-4447-a1eb-afa319b4a93a"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cef755db-4686-4b15-a84d-4e9be406037f',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  'cef755db-4686-4b15-a84d-4e9be406037f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:17 GMT'
]);
