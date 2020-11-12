let nock = require('nock');

module.exports.hash = "3a55159a820d0bc168ae8ff1e0177da7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-24T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-23T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-21T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-20T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-19T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-18T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-17T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-16T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-15T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-14T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-13T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-12T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-11T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-10T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-09T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-08T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-07T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-06T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-05T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-04T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-03T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-02T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-01T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '2229',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '406c2728-3e24-4d31-98f4-1524319b585d',
  'x-envoy-upstream-service-time',
  '361',
  'apim-request-id',
  '406c2728-3e24-4d31-98f4-1524319b585d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:37 GMT'
]);
