let nock = require('nock');

module.exports.hash = "6253dbcb23b32d3cec4b2a33144aeea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/1d0da4ea-e060-4e2e-a434-7a3ad2fce8ea')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '94a30e05-d4c9-4f7f-884c-c221ad9b0ce0',
  'x-envoy-upstream-service-time',
  '510',
  'apim-request-id',
  '94a30e05-d4c9-4f7f-884c-c221ad9b0ce0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/1d0da4ea-e060-4e2e-a434-7a3ad2fce8ea')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '628938e7-8439-419f-9865-fcea1a5c974e',
  'x-envoy-upstream-service-time',
  '59',
  'apim-request-id',
  '628938e7-8439-419f-9865-fcea1a5c974e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:05 GMT'
]);
