let nock = require('nock');

module.exports.hash = "883281507b25bd9594bc80ca4e2c8c85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/56973712-0033-449f-ab7d-b53546cfdc23')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ad3c4255-bc41-4923-99af-6aae8dcc8e4b',
  'x-envoy-upstream-service-time',
  '432',
  'apim-request-id',
  'ad3c4255-bc41-4923-99af-6aae8dcc8e4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/56973712-0033-449f-ab7d-b53546cfdc23')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2e9249c0-60c9-4b6b-85a5-3d816368c141',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '2e9249c0-60c9-4b6b-85a5-3d816368c141',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:34 GMT'
]);
