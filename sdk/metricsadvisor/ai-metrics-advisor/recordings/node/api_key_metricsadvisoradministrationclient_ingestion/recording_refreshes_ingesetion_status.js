let nock = require('nock');

module.exports.hash = "db6f89418c6deed688ce961aee0dd015";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-10-31T00:00:00Z","status":"Running","message":""},{"timestamp":"2020-10-30T00:00:00Z","status":"Running","message":""}]}, [
  'Content-Length',
  '149',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f3d69b6c-f511-4fd7-ac84-ad7272121dc8',
  'x-envoy-upstream-service-time',
  '231',
  'apim-request-id',
  'f3d69b6c-f511-4fd7-ac84-ad7272121dc8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:16 GMT'
]);
