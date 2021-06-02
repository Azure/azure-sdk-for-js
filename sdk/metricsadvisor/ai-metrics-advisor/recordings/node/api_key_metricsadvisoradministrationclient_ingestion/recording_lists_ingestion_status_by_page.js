let nock = require('nock');

module.exports.hash = "93dee8c8770c9f1d32b06775d8ae6481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:56:26Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:55:17Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '416',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aa46ded3-e390-485f-a41f-a15370842149',
  'x-envoy-upstream-service-time',
  '5229',
  'apim-request-id',
  'aa46ded3-e390-485f-a41f-a15370842149',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 05:59:11 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:54:42Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-06-02T05:52:52Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '416',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '833c90b4-b13b-4762-9f1e-0e02be57a92c',
  'x-envoy-upstream-service-time',
  '5301',
  'apim-request-id',
  '833c90b4-b13b-4762-9f1e-0e02be57a92c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 05:59:17 GMT'
]);
