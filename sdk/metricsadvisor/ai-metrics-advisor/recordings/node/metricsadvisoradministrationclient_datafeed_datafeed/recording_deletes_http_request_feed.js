let nock = require('nock');

module.exports.hash = "f8cc35d66549f37b74027ff201a5e0b8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/90ccbfc4-45e5-444f-b0d2-91bf26b1ac22')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd33d218e-acd7-439d-899e-679b2b495a1d',
  'x-envoy-upstream-service-time',
  '1255',
  'apim-request-id',
  'd33d218e-acd7-439d-899e-679b2b495a1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/90ccbfc4-45e5-444f-b0d2-91bf26b1ac22')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '228479a4-ce00-4162-afbe-1928c8a665cf',
  'x-envoy-upstream-service-time',
  '203',
  'apim-request-id',
  '228479a4-ce00-4162-afbe-1928c8a665cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:19 GMT'
]);
