let nock = require('nock');

module.exports.hash = "dd9d3737f1407f2c7563f2ae1728ce3b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/2eef93ad-df4a-4de6-bea1-e4de536d050f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f83a7c70-6cfd-42b8-86e3-bb2b6ede82e7',
  'x-envoy-upstream-service-time',
  '427',
  'apim-request-id',
  'f83a7c70-6cfd-42b8-86e3-bb2b6ede82e7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/2eef93ad-df4a-4de6-bea1-e4de536d050f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1b3d8477-6b2f-4c99-a790-689d8f47b82e',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '1b3d8477-6b2f-4c99-a790-689d8f47b82e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 02:36:42 GMT'
]);
