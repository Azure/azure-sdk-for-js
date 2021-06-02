let nock = require('nock');

module.exports.hash = "883281507b25bd9594bc80ca4e2c8c85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e4379949-6d60-49bf-969c-a3d157c62938')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8e117791-0917-460e-8e91-1ef2e46e4932',
  'x-envoy-upstream-service-time',
  '456',
  'apim-request-id',
  '8e117791-0917-460e-8e91-1ef2e46e4932',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e4379949-6d60-49bf-969c-a3d157c62938')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fe00f15d-f6aa-4e5e-9bd0-e7aa20921b41',
  'x-envoy-upstream-service-time',
  '5151',
  'apim-request-id',
  'fe00f15d-f6aa-4e5e-9bd0-e7aa20921b41',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:38 GMT'
]);
