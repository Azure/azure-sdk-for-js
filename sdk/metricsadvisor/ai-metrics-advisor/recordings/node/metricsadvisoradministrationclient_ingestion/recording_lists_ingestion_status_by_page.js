let nock = require('nock');

module.exports.hash = "1e9f814b88e5fc71d6b34c5feff308d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-30T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query?$top=2&$skip=2"}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '671f976d-471e-4e2c-b709-9f7170b4c430',
  'x-envoy-upstream-service-time',
  '5380',
  'apim-request-id',
  '671f976d-471e-4e2c-b709-9f7170b4c430',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-28T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query?$top=2&$skip=4"}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8bdfce44-7a91-4b34-aa24-afc598950715',
  'x-envoy-upstream-service-time',
  '202',
  'apim-request-id',
  '8bdfce44-7a91-4b34-aa24-afc598950715',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:43 GMT'
]);
