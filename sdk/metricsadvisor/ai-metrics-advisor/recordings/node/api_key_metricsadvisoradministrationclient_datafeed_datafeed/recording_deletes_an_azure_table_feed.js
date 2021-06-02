let nock = require('nock');

module.exports.hash = "9fe96ef040315d1e16720e3f16d91c77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7671f33c-e88f-4edf-91aa-d0c9a8a56d2e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ccfcdb6b-42a8-4d9f-97c9-2a522db0539e',
  'x-envoy-upstream-service-time',
  '381',
  'apim-request-id',
  'ccfcdb6b-42a8-4d9f-97c9-2a522db0539e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7671f33c-e88f-4edf-91aa-d0c9a8a56d2e')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f272fd3b-8169-4cd1-8746-3419145d8cab',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'f272fd3b-8169-4cd1-8746-3419145d8cab',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:20 GMT'
]);
