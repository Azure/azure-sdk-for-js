let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '008c97f5-2b51-4f88-ac86-edac24a440a0',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '008c97f5-2b51-4f88-ac86-edac24a440a0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/49dcf7e4-7f5b-4a80-9926-18b157405904')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 08816311-f079-4c55-bd51-28459970a9ba"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '08816311-f079-4c55-bd51-28459970a9ba',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '08816311-f079-4c55-bd51-28459970a9ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:59 GMT'
]);
