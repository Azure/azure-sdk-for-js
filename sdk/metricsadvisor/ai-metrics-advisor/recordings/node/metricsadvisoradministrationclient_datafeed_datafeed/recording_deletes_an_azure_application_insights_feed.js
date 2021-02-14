let nock = require('nock');

module.exports.hash = "029380c24e3327f7b4b4c25a1429439e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/89cd21ff-86b3-4707-962f-32b0b4dc82c7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '07edca18-7915-4280-9169-dd0a13f59f83',
  'x-envoy-upstream-service-time',
  '327',
  'apim-request-id',
  '07edca18-7915-4280-9169-dd0a13f59f83',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/89cd21ff-86b3-4707-962f-32b0b4dc82c7')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fcf0955d-62d0-46c2-b441-da49db195c3c',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'fcf0955d-62d0-46c2-b441-da49db195c3c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:24 GMT'
]);
