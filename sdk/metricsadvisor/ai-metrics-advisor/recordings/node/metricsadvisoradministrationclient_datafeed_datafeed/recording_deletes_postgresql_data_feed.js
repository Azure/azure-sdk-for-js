let nock = require('nock');

module.exports.hash = "89f3d3790811cd39af14de581b564dc1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0c05dc38-7d21-4250-92b4-816561701d63')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '30ca9ab1-95ec-4a5f-aa08-f97482a5b1d0',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '30ca9ab1-95ec-4a5f-aa08-f97482a5b1d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:03:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0c05dc38-7d21-4250-92b4-816561701d63')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '34aa0773-76dc-4bb9-af75-0a146a6bb0bb',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '34aa0773-76dc-4bb9-af75-0a146a6bb0bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:03:04 GMT'
]);
