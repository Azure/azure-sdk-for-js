let nock = require('nock');

module.exports.hash = "64cf5c6126184b4197c02d4fc2aa63fc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/8c3b5f4d-7824-4c00-b50b-8b168ad58be3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '95b18b3b-6e38-4588-9856-31d3276c26af',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  '95b18b3b-6e38-4588-9856-31d3276c26af',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/8c3b5f4d-7824-4c00-b50b-8b168ad58be3')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '88daa159-b8e9-48ba-8bb8-ea2dae05b42f',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  '88daa159-b8e9-48ba-8bb8-ea2dae05b42f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:42:44 GMT'
]);
