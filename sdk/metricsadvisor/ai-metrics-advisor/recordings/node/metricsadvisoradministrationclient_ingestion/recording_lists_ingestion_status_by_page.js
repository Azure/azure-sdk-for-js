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
  'd77026fe-7673-4025-a8d1-ce54fdf9392b',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'd77026fe-7673-4025-a8d1-ce54fdf9392b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:45:58 GMT'
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
  '77ea8043-09a5-4c99-b373-02c34b428925',
  'x-envoy-upstream-service-time',
  '5335',
  'apim-request-id',
  '77ea8043-09a5-4c99-b373-02c34b428925',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:04 GMT'
]);
