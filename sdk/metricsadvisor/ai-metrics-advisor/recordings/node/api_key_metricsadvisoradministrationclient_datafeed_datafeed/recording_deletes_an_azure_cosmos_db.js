let nock = require('nock');

module.exports.hash = "0fb281fee73aac4f977819f93d7967b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/71b3947e-fda3-4255-a0a4-6d5ba4fdf398')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b65669d9-f44b-4901-bc8a-6e25cfa888b7',
  'x-envoy-upstream-service-time',
  '376',
  'apim-request-id',
  'b65669d9-f44b-4901-bc8a-6e25cfa888b7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/71b3947e-fda3-4255-a0a4-6d5ba4fdf398')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ddf9a18d-e7d8-4c66-ba78-4b92807ba023',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'ddf9a18d-e7d8-4c66-ba78-4b92807ba023',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:59 GMT'
]);
