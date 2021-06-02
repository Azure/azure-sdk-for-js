let nock = require('nock');

module.exports.hash = "883281507b25bd9594bc80ca4e2c8c85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ed591867-5252-4ece-9bf4-3a0f7f32c342')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '8bea4d8e-9b89-4084-9c5f-0e71b92700ac',
  'x-envoy-upstream-service-time',
  '389',
  'apim-request-id',
  '8bea4d8e-9b89-4084-9c5f-0e71b92700ac',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ed591867-5252-4ece-9bf4-3a0f7f32c342')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4af58920-a8cc-48e0-85e8-bc6e78f55d73',
  'x-envoy-upstream-service-time',
  '77',
  'apim-request-id',
  '4af58920-a8cc-48e0-85e8-bc6e78f55d73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 03:03:19 GMT'
]);
