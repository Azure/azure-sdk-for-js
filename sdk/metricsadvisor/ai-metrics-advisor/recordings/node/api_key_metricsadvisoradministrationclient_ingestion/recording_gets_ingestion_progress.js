let nock = require('nock');

module.exports.hash = "41edb14802429ba0a1e3bcaf1264f4ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2022-01-07T00:00:00Z","latestActiveTimestamp":"2022-01-07T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '204c64d3-5640-47c4-91c6-6682cc371747',
  'x-envoy-upstream-service-time',
  '257',
  'apim-request-id',
  '204c64d3-5640-47c4-91c6-6682cc371747',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:15:58 GMT'
]);
