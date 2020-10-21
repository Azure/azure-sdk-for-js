let nock = require('nock');

module.exports.hash = "8b7120b74a1447be92566e8d72bc366c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9bcf09d4-8142-45f3-a6a2-73296ced442e',
  'x-envoy-upstream-service-time',
  '270',
  'apim-request-id',
  '9bcf09d4-8142-45f3-a6a2-73296ced442e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a5c71d07-59c8-4407-9c33-3ed4d6823f13')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7ff23124-1787-4574-91cf-65d1c3207c20',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '7ff23124-1787-4574-91cf-65d1c3207c20',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:37 GMT'
]);
