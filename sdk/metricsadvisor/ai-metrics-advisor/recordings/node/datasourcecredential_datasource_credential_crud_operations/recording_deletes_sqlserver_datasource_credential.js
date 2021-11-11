let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/0da7e320-dfa8-4288-9550-4da9509f072a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '985739b5-9342-4349-8984-9aacda658aaf',
  'x-envoy-upstream-service-time',
  '109',
  'apim-request-id',
  '985739b5-9342-4349-8984-9aacda658aaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/0da7e320-dfa8-4288-9550-4da9509f072a')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'daa36fde-cf22-495c-b3eb-b9f1120060a5',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  'daa36fde-cf22-495c-b3eb-b9f1120060a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:10 GMT'
]);
