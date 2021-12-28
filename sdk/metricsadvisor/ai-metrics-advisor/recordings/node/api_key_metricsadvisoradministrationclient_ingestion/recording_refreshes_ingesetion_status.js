let nock = require('nock');

module.exports.hash = "481a1703db08a541b8a31c330d57373f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-10-31T00:00:00Z","status":"Running","message":""},{"timestamp":"2020-10-30T00:00:00Z","status":"Running","message":""}]}, [
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '06f7d416-cca3-4c5e-9e55-10e031f60679',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  '06f7d416-cca3-4c5e-9e55-10e031f60679',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:12 GMT'
]);
