let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/4615771e-a822-4624-98d0-429237edaf4c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '29ed890d-618c-465d-aee8-79c6135abdaf',
  'x-envoy-upstream-service-time',
  '322',
  'apim-request-id',
  '29ed890d-618c-465d-aee8-79c6135abdaf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4615771e-a822-4624-98d0-429237edaf4c')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '33486b30-1d73-4c24-8cce-07542b1d22a2',
  'x-envoy-upstream-service-time',
  '70',
  'apim-request-id',
  '33486b30-1d73-4c24-8cce-07542b1d22a2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:01 GMT'
]);
