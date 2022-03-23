let nock = require('nock');

module.exports.hash = "41edb14802429ba0a1e3bcaf1264f4ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2022-01-19T00:00:00Z","latestActiveTimestamp":"2022-01-19T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3e7d6328-62fc-45e3-9e60-8446f54e2df6',
  'x-envoy-upstream-service-time',
  '271',
  'apim-request-id',
  '3e7d6328-62fc-45e3-9e60-8446f54e2df6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:15 GMT'
]);
