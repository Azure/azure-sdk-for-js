let nock = require('nock');

module.exports.hash = "b5fd0decc061fef9383c5036ded1a14b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:07:13Z"}]}, [
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd6c7c368-9a25-42f1-8aaf-bfa2cc08e376',
  'x-envoy-upstream-service-time',
  '5261',
  'apim-request-id',
  'd6c7c368-9a25-42f1-8aaf-bfa2cc08e376',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:09:08 GMT'
]);
