let nock = require('nock');

module.exports.hash = "5349a68c0261fcac86d6839b6fdcbd32";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/1e23316a-5a0b-411d-a8f7-93f4d54467f7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '64d899c3-8067-4c2f-a087-aacae5bf1dc1',
  'x-envoy-upstream-service-time',
  '97',
  'apim-request-id',
  '64d899c3-8067-4c2f-a087-aacae5bf1dc1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/1e23316a-5a0b-411d-a8f7-93f4d54467f7')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyDetectionConfiguration. TraceId: c0e6d675-6d7c-4eaf-99ce-86df67fe64ca"}, [
  'Content-Length',
  '124',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'de5bf517-6343-415b-ba16-68147250c874',
  'x-envoy-upstream-service-time',
  '67',
  'apim-request-id',
  'de5bf517-6343-415b-ba16-68147250c874',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:14 GMT'
]);
