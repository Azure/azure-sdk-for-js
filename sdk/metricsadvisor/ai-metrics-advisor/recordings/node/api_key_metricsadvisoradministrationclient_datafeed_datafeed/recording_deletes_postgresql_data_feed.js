let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e9bd38b9-57f0-4b7c-8dbf-7b72ce774b05')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '947f29f7-8b1c-4595-a21e-6d85a2bf298b',
  'x-envoy-upstream-service-time',
  '320',
  'apim-request-id',
  '947f29f7-8b1c-4595-a21e-6d85a2bf298b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e9bd38b9-57f0-4b7c-8dbf-7b72ce774b05')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'def8d797-9f89-4674-8320-50c7f289d755',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'def8d797-9f89-4674-8320-50c7f289d755',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:16 GMT'
]);
