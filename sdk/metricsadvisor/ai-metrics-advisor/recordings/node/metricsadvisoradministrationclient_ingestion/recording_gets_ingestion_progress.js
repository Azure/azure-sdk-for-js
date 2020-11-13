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
  '9ac82bf7-9a90-43d7-9a54-9ccc14be5551',
  'x-envoy-upstream-service-time',
  '178',
  'apim-request-id',
  '9ac82bf7-9a90-43d7-9a54-9ccc14be5551',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:12 GMT'
]);
