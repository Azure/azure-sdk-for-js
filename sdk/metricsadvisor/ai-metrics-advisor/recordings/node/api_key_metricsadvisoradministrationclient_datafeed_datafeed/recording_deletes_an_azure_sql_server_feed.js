let nock = require('nock');

module.exports.hash = "b2209a17485822432cf80b656050872d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/40a324e6-3b8d-4f09-a39e-ded2c386ea31')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'af897347-dfba-49ec-af4f-277b74653268',
  'x-envoy-upstream-service-time',
  '411',
  'apim-request-id',
  'af897347-dfba-49ec-af4f-277b74653268',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/40a324e6-3b8d-4f09-a39e-ded2c386ea31')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1b6d8a47-d2e7-41f7-8976-4bc0516ff3a6',
  'x-envoy-upstream-service-time',
  '75',
  'apim-request-id',
  '1b6d8a47-d2e7-41f7-8976-4bc0516ff3a6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:17 GMT'
]);
