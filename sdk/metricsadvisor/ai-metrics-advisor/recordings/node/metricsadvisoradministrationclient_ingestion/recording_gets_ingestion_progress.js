let nock = require('nock');

module.exports.hash = "5348f8c8e57bee11a45ef17648833e16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2020-11-11T00:00:00Z","latestActiveTimestamp":"2020-11-11T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd89da041-3d82-4d9d-9c8a-a0fb74371473',
  'x-envoy-upstream-service-time',
  '392',
  'apim-request-id',
  'd89da041-3d82-4d9d-9c8a-a0fb74371473',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:29 GMT'
]);
