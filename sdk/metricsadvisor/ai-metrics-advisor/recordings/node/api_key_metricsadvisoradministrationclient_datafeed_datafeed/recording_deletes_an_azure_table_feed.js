let nock = require('nock');

module.exports.hash = "9fe96ef040315d1e16720e3f16d91c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/c5ca1b9e-fe12-414c-9109-311b877ff079')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'be3fbd87-afa8-48b3-b15a-e188cd35290a',
  'x-envoy-upstream-service-time',
  '397',
  'apim-request-id',
  'be3fbd87-afa8-48b3-b15a-e188cd35290a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/c5ca1b9e-fe12-414c-9109-311b877ff079')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '84022103-9836-4707-acc9-3f4d91d19419',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '84022103-9836-4707-acc9-3f4d91d19419',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:39 GMT'
]);
