let nock = require('nock');

module.exports.hash = "3fc5740afa8d751ac63cde56f92b9419";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:09Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:12Z"},{"timestamp":"2020-08-29T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:13Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:29Z"},{"timestamp":"2020-08-27T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:44Z"},{"timestamp":"2020-08-26T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:44Z"},{"timestamp":"2020-08-25T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:30Z"},{"timestamp":"2020-08-24T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:45Z"},{"timestamp":"2020-08-23T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:59Z"},{"timestamp":"2020-08-22T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:53:35Z"},{"timestamp":"2020-08-21T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:58Z"},{"timestamp":"2020-08-20T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:18Z"},{"timestamp":"2020-08-19T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:59Z"},{"timestamp":"2020-08-18T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:04Z"},{"timestamp":"2020-08-17T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:08Z"},{"timestamp":"2020-08-16T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:53:39Z"},{"timestamp":"2020-08-15T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:09Z"},{"timestamp":"2020-08-14T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:09Z"},{"timestamp":"2020-08-13T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:19Z"},{"timestamp":"2020-08-12T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:52:28Z"},{"timestamp":"2020-08-11T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:55:49Z"},{"timestamp":"2020-08-10T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:23Z"},{"timestamp":"2020-08-09T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:23Z"},{"timestamp":"2020-08-08T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:23Z"},{"timestamp":"2020-08-07T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:28Z"},{"timestamp":"2020-08-06T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:27Z"},{"timestamp":"2020-08-05T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:28Z"},{"timestamp":"2020-08-04T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:56:34Z"},{"timestamp":"2020-08-03T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:57:59Z"},{"timestamp":"2020-08-02T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:57:54Z"},{"timestamp":"2020-08-01T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-11T19:58:00Z"}]}, [
  'Content-Length',
  '4351',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c698c1c4-297f-47cb-9a41-e1807252841f',
  'x-envoy-upstream-service-time',
  '320',
  'apim-request-id',
  'c698c1c4-297f-47cb-9a41-e1807252841f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 May 2021 20:07:07 GMT'
]);
