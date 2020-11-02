let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd1f76e54-0549-4a78-bd16-94c99ca93a4e',
  'x-envoy-upstream-service-time',
  '335',
  'apim-request-id',
  'd1f76e54-0549-4a78-bd16-94c99ca93a4e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:37 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/78e1c1f1-64ee-472c-9090-50a1070590d6')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '24de82ec-8d6a-4a0a-8f99-1391482be22d',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '24de82ec-8d6a-4a0a-8f99-1391482be22d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:38 GMT',
  'Connection',
  'close'
]);
