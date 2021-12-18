let nock = require('nock');

module.exports.hash = "536383fbbe259a2e561915c459a152c3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd1597f2b-c9c0-4b56-add8-b3c43a9ad98c',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'd1597f2b-c9c0-4b56-add8-b3c43a9ad98c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7b07c399-db39-4c99-b1b1-62b5ff9aac49')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: c606342e-59aa-49fc-a1fc-7888afa46cf0"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c606342e-59aa-49fc-a1fc-7888afa46cf0',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  'c606342e-59aa-49fc-a1fc-7888afa46cf0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:59 GMT'
]);
