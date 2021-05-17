let nock = require('nock');

module.exports.hash = "92461016236353b27959e8d6297a3efe";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a2382f69-744f-4e25-8e83-accb531dabec',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  'a2382f69-744f-4e25-8e83-accb531dabec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/3722e939-b1ba-4142-885c-cf8d0d1eb68a')
  .reply(404, {"code":"Not Found","message":"Not found this AnomalyAlertingConfiguration. TraceId: beaf9d06-de35-9487-b4b0-05c25a46ee38"}, [
  'Content-Length',
  '123',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6554ab9-7791-42d9-b15a-c086f5afa1b7',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  'f6554ab9-7791-42d9-b15a-c086f5afa1b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:17 GMT'
]);
