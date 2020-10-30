let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/eb988e21-fbae-45d2-bdf5-309ba6473630')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '45d3f06d-fef1-40cd-b35b-d313020fe215',
  'x-envoy-upstream-service-time',
  '225',
  'apim-request-id',
  '45d3f06d-fef1-40cd-b35b-d313020fe215',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:50 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/eb988e21-fbae-45d2-bdf5-309ba6473630')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '17118633-3a6f-4492-9bf2-670a4c1478fd',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '17118633-3a6f-4492-9bf2-670a4c1478fd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 20 Oct 2020 22:50:50 GMT',
  'Connection',
  'close'
]);
