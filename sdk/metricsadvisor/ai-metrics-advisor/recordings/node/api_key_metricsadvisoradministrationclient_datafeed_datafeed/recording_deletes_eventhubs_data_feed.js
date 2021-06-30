let nock = require('nock');

module.exports.hash = "3b26ef694bf46025b536723153ef1756";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f46f05e8-727e-4d5b-b06c-c32568a3b7c0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '7b25fb33-933a-483d-ae16-0f0559ac9b0a',
  'x-envoy-upstream-service-time',
  '6024',
  'apim-request-id',
  '7b25fb33-933a-483d-ae16-0f0559ac9b0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:12:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f46f05e8-727e-4d5b-b06c-c32568a3b7c0')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09e4fefd-c131-4c40-97c3-261d187b6d5e',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  '09e4fefd-c131-4c40-97c3-261d187b6d5e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 30 Jun 2021 01:12:03 GMT'
]);
