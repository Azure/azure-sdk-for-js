let nock = require('nock');

module.exports.hash = "1e9f814b88e5fc71d6b34c5feff308d0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-30T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$top=2&$skip=2"}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '18f747e3-2644-47fe-9eca-01a6d9230c30',
  'x-envoy-upstream-service-time',
  '353',
  'apim-request-id',
  '18f747e3-2644-47fe-9eca-01a6d9230c30',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-28T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$top=2&$skip=4"}, [
  'Content-Length',
  '330',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aa0711a8-e9e1-4c87-9771-8d034989e0de',
  'x-envoy-upstream-service-time',
  '243',
  'apim-request-id',
  'aa0711a8-e9e1-4c87-9771-8d034989e0de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:07 GMT'
]);
