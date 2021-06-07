let nock = require('nock');

module.exports.hash = "64cf5c6126184b4197c02d4fc2aa63fc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/ec181955-bbf5-40b9-8fb7-4a4c0c9ffad7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '47d59a6f-d116-446c-b909-6ad21e9b1b99',
  'x-envoy-upstream-service-time',
  '412',
  'apim-request-id',
  '47d59a6f-d116-446c-b909-6ad21e9b1b99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/ec181955-bbf5-40b9-8fb7-4a4c0c9ffad7')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25d49cdf-d438-445e-8bcc-4b1fa418ba4b',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '25d49cdf-d438-445e-8bcc-4b1fa418ba4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:06 GMT'
]);
