let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b076b4e4-4a9d-4f89-8f55-ce55c87dc2ba')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e72790e3-ae42-4593-ab6e-030f5b57ef8d',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'e72790e3-ae42-4593-ab6e-030f5b57ef8d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b076b4e4-4a9d-4f89-8f55-ce55c87dc2ba')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd28f6cc9-f7b0-4d87-9390-b889220acdc0',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  'd28f6cc9-f7b0-4d87-9390-b889220acdc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:03 GMT'
]);
