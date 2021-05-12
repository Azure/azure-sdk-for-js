let nock = require('nock');

module.exports.hash = "b5fd0decc061fef9383c5036ded1a14b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:53:35Z"}]}, [
  'Content-Length',
  '151',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '97665910-ba05-47f7-94cf-33af8b488398',
  'x-envoy-upstream-service-time',
  '351',
  'apim-request-id',
  '97665910-ba05-47f7-94cf-33af8b488398',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 May 2021 20:07:09 GMT'
]);
