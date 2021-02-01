let nock = require('nock');

module.exports.hash = "3e5c3b1eb3b76a56d194b0710dfff959";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2021-01-14T00:00:00Z","latestActiveTimestamp":"2021-01-14T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a2f2ae04-4d4c-4189-974c-c1874a96c5e2',
  'x-envoy-upstream-service-time',
  '260',
  'apim-request-id',
  'a2f2ae04-4d4c-4189-974c-c1874a96c5e2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:15 GMT'
]);
