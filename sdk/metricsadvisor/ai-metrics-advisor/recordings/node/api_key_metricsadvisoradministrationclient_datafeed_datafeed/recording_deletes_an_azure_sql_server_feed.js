let nock = require('nock');

module.exports.hash = "b2209a17485822432cf80b656050872d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0b87eef8-6235-4fe6-9889-5568d2345fc0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6b1dfbe4-f09e-4647-991e-83483fbf6f16',
  'x-envoy-upstream-service-time',
  '441',
  'apim-request-id',
  '6b1dfbe4-f09e-4647-991e-83483fbf6f16',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0b87eef8-6235-4fe6-9889-5568d2345fc0')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '72284347-3f13-4695-96a5-91aececa4839',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '72284347-3f13-4695-96a5-91aececa4839',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:30 GMT'
]);
