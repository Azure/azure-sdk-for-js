let nock = require('nock');

module.exports.hash = "883281507b25bd9594bc80ca4e2c8c85";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5d2bddd0-0c56-434b-8d1b-fb7b33ae24c7')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e7b117c2-58ac-4a69-a34a-eefc75ad774b',
  'x-envoy-upstream-service-time',
  '388',
  'apim-request-id',
  'e7b117c2-58ac-4a69-a34a-eefc75ad774b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5d2bddd0-0c56-434b-8d1b-fb7b33ae24c7')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6069a3c2-d67f-47ac-8ca6-40567388c273',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '6069a3c2-d67f-47ac-8ca6-40567388c273',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:11:01 GMT'
]);
