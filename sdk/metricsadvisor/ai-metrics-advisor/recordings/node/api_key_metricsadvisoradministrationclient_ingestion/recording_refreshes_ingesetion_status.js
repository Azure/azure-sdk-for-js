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
  '69824b18-dbf8-4a1c-885e-ea37a0dead2d',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '69824b18-dbf8-4a1c-885e-ea37a0dead2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:15:59 GMT'
]);
