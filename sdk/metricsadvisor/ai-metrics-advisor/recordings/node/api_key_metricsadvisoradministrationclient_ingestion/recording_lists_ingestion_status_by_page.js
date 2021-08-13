let nock = require('nock');

module.exports.hash = "93dee8c8770c9f1d32b06775d8ae6481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:36:01Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:55:32Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '452',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cb53381b-2440-4fe9-b40c-63e49d4825df',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  'cb53381b-2440-4fe9-b40c-63e49d4825df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:54:49Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:52:57Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '452',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd82a23f4-10cc-4964-9ce2-54f3cce950f5',
  'x-envoy-upstream-service-time',
  '209',
  'apim-request-id',
  'd82a23f4-10cc-4964-9ce2-54f3cce950f5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:49 GMT'
]);
