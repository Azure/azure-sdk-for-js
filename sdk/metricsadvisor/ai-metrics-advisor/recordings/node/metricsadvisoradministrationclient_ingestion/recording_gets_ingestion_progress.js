let nock = require('nock');

module.exports.hash = "5348f8c8e57bee11a45ef17648833e16";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2020-11-12T00:00:00Z","latestActiveTimestamp":"2020-11-12T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '101d4acc-6600-453e-816c-1b19d428e80a',
  'x-envoy-upstream-service-time',
  '191',
  'apim-request-id',
  '101d4acc-6600-453e-816c-1b19d428e80a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:31 GMT'
]);
