let nock = require('nock');

module.exports.hash = "0fb281fee73aac4f977819f93d7967b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/bb533249-c8c0-4b21-b603-0cdbd5ae8278')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2a72a657-a1a3-45f3-b34a-50a9101bff55',
  'x-envoy-upstream-service-time',
  '412',
  'apim-request-id',
  '2a72a657-a1a3-45f3-b34a-50a9101bff55',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/bb533249-c8c0-4b21-b603-0cdbd5ae8278')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '68dde48b-40a6-4749-814e-27ec65aef7f9',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  '68dde48b-40a6-4749-814e-27ec65aef7f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:18 GMT'
]);
