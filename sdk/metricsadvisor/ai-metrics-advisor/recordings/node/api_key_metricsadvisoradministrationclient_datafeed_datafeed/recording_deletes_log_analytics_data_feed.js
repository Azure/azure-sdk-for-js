let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d076d2d1-00b1-4e9a-803b-af25bbfa4f6e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a98a7a77-947b-4894-a7af-4f6427cbaf9e',
  'x-envoy-upstream-service-time',
  '305',
  'apim-request-id',
  'a98a7a77-947b-4894-a7af-4f6427cbaf9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d076d2d1-00b1-4e9a-803b-af25bbfa4f6e')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f8d7d7fd-301a-4c9b-92c1-a0962eec26f4',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  'f8d7d7fd-301a-4c9b-92c1-a0962eec26f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:04 GMT'
]);
