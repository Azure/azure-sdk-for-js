let nock = require('nock');

module.exports.hash = "41edb14802429ba0a1e3bcaf1264f4ab";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2021-12-17T00:00:00Z","latestActiveTimestamp":"2021-12-17T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e26fc752-c56b-4db6-9be1-a3549cc82b51',
  'x-envoy-upstream-service-time',
  '248',
  'apim-request-id',
  'e26fc752-c56b-4db6-9be1-a3549cc82b51',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:01:56 GMT'
]);
