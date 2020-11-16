let nock = require('nock');

module.exports.hash = "7c0111a7cb8e47c7f98611b4a04dcb71";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/540b2568-9fdd-46ad-a81d-48bb5d9d7c49')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3c72ad36-8dd1-4b6d-8390-851067ba2d3b',
  'x-envoy-upstream-service-time',
  '297',
  'apim-request-id',
  '3c72ad36-8dd1-4b6d-8390-851067ba2d3b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/540b2568-9fdd-46ad-a81d-48bb5d9d7c49')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8bb04dd4-6b8b-4f8c-995b-75a5eaee9fa0',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '8bb04dd4-6b8b-4f8c-995b-75a5eaee9fa0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:25 GMT'
]);
