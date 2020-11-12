let nock = require('nock');

module.exports.hash = "68451355673656ee7be4f2944be23714";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0db874c5-0c18-4353-9131-214233edf7dc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ca130b59-6bd4-423a-b2f9-d8d509906dbf',
  'x-envoy-upstream-service-time',
  '2277',
  'apim-request-id',
  'ca130b59-6bd4-423a-b2f9-d8d509906dbf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0db874c5-0c18-4353-9131-214233edf7dc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25780d81-a513-498f-98fb-286b25410dc0',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '25780d81-a513-498f-98fb-286b25410dc0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:18 GMT'
]);
