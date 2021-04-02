let nock = require('nock');

module.exports.hash = "3467b9577b6a0cbbc2fd9cd5043145f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '92f30fb6-f47d-4efc-a690-109a7846cff4',
  'x-envoy-upstream-service-time',
  '376',
  'apim-request-id',
  '92f30fb6-f47d-4efc-a690-109a7846cff4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/6214e294-ecab-47b3-8494-ebce69e03dd6')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '80191b94-2c7e-4e48-abf2-3442349a1c99',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '80191b94-2c7e-4e48-abf2-3442349a1c99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:28 GMT'
]);
