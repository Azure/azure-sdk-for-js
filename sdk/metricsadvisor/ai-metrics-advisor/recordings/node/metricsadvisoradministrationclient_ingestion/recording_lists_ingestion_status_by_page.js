let nock = require('nock');

module.exports.hash = "9aab21598353486efdcba3e69cf8ad7e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-30T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$top=2&$skip=2"}, [
  'Content-Length',
  '333',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '95661ca9-cc24-44f0-b799-7ec90f318b82',
  'x-envoy-upstream-service-time',
  '5313',
  'apim-request-id',
  '95661ca9-cc24-44f0-b799-7ec90f318b82',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 21:47:00 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-28T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$top=2&$skip=4"}, [
  'Content-Length',
  '333',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c4026840-8cb4-431e-b8c0-ce0559963b2c',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  'c4026840-8cb4-431e-b8c0-ce0559963b2c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 21:47:01 GMT',
  'Connection',
  'close'
]);
