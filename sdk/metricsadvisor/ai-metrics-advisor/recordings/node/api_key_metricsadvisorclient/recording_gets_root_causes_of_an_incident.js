let nock = require('nock');

module.exports.hash = "472ae8b1f82a93f3a899f43727dc1307";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/045f03a31628d5938cd75cfdecfff045-17465dcc000/rootCause')
  .reply(404, {"code":"Not Found","message":"Not found this Incident. TraceId: 3e37d2b0-033d-4e95-9ec8-807aacc1e080"}, [
  'Content-Length',
  '103',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3e37d2b0-033d-4e95-9ec8-807aacc1e080',
  'x-envoy-upstream-service-time',
  '171',
  'apim-request-id',
  '3e37d2b0-033d-4e95-9ec8-807aacc1e080',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:28 GMT'
]);
