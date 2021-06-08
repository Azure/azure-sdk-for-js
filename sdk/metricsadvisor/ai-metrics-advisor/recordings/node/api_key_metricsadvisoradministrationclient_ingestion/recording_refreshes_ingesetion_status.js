let nock = require('nock');

module.exports.hash = "b5fd0decc061fef9383c5036ded1a14b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:43:31Z"}]}, [
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bb987fea-9cdf-454d-943e-8c03839c64f9',
  'x-envoy-upstream-service-time',
  '233',
  'apim-request-id',
  'bb987fea-9cdf-454d-943e-8c03839c64f9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:49 GMT'
]);
