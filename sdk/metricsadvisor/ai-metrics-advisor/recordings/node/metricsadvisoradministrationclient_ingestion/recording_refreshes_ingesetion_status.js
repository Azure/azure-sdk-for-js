let nock = require('nock');

module.exports.hash = "135ca41d063e560363416c1ac506473f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '99',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4f532883-3a02-4cd0-9070-a28cc1299760',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  '4f532883-3a02-4cd0-9070-a28cc1299760',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionProgress/reset', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '28eb979a-fcf4-4180-92d3-dccf02b27271',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '28eb979a-fcf4-4180-92d3-dccf02b27271',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":""}],"@nextLink":null}, [
  'Content-Length',
  '100',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eacbad4b-962f-48d4-92ac-cc1d18682bdb',
  'x-envoy-upstream-service-time',
  '218',
  'apim-request-id',
  'eacbad4b-962f-48d4-92ac-cc1d18682bdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:31 GMT'
]);
