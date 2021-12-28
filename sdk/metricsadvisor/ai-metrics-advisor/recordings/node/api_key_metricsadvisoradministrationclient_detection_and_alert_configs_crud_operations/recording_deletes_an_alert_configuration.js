let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1be9d8d6-4646-4248-b591-8773a9b8bec6',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '1be9d8d6-4646-4248-b591-8773a9b8bec6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/dc77a835-8161-416a-bd73-035d5e49b69d')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: 0344fbeb-4ed0-4662-9b09-1673f5e4bd52"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0344fbeb-4ed0-4662-9b09-1673f5e4bd52',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  '0344fbeb-4ed0-4662-9b09-1673f5e4bd52',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:15 GMT'
]);
