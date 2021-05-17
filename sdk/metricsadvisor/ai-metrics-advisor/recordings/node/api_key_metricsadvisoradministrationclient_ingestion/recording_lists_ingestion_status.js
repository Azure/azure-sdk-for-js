let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:02:38Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:59:30Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:04:05Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:02:53Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:03:08Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:05:53Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:05:18Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:05:18Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:06:53Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:07:13Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:08:38Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:08:02Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:45:12Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:52:37Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:52:43Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:57:19Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:58:58Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:58:32Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:02:08Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:02:26Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:04:33Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:05:11Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:06:22Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:06:10Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:08:38Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:05:59Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T04:08:34Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:31Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:14:03Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:12:48Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-05-15T00:12:40Z"}]}, [
  'Content-Length',
  '4093',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '84564096-07da-4f41-9369-cc0ac0731319',
  'x-envoy-upstream-service-time',
  '5399',
  'apim-request-id',
  '84564096-07da-4f41-9369-cc0ac0731319',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:08:57 GMT'
]);
