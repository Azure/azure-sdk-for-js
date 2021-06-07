let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:36:01Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:55:32Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:54:49Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:52:57Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:27:37Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:50:12Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:19:54Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:47:34Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:22:43Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:43:31Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:16:13Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:39:15Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:28:56Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:26:27Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:25:10Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:24:36Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:55:06Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:56:16Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:58:44Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:20:57Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:17:23Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:17:14Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:50:55Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:50:37Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:13:12Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:12:03Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:47:09Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T05:44:39Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T15:39:37Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T15:47:32Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T16:06:18Z"}]}, [
  'Content-Length',
  '3979',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f37e0fff-838d-43cb-bb8e-38ac64d51da8',
  'x-envoy-upstream-service-time',
  '216',
  'apim-request-id',
  'f37e0fff-838d-43cb-bb8e-38ac64d51da8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:48 GMT'
]);
