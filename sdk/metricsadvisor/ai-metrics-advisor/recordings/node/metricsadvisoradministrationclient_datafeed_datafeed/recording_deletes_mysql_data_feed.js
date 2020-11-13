let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7086b541-89ba-4e0d-82c0-e4b747ca3ffc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4c27bdec-1470-4266-8c0c-86ca20091570',
  'x-envoy-upstream-service-time',
  '826',
  'apim-request-id',
  '4c27bdec-1470-4266-8c0c-86ca20091570',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7086b541-89ba-4e0d-82c0-e4b747ca3ffc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2095f443-7312-4c0d-a547-f300549c2d89',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '2095f443-7312-4c0d-a547-f300549c2d89',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:28 GMT'
]);
