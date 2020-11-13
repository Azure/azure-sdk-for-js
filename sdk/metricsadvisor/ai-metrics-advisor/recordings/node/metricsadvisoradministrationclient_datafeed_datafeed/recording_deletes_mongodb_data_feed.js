let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/65e30c93-f44d-4bb2-b961-51ff3a689008')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8e7bce27-2386-4305-b024-680a8b7ab3c3',
  'x-envoy-upstream-service-time',
  '896',
  'apim-request-id',
  '8e7bce27-2386-4305-b024-680a8b7ab3c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/65e30c93-f44d-4bb2-b961-51ff3a689008')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9d5fdc10-9785-4c17-bfa7-ee02e27a8a3d',
  'x-envoy-upstream-service-time',
  '124',
  'apim-request-id',
  '9d5fdc10-9785-4c17-bfa7-ee02e27a8a3d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:26 GMT'
]);
