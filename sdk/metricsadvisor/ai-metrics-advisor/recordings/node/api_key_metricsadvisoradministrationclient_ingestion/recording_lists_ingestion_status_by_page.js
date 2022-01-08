let nock = require('nock');

module.exports.hash = "2fcf1abe7a40299b4ef9d153ec88dbd5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-30T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint/:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cb9c3e5d-e3ce-48e9-ba64-c04c86c8fa9b',
  'x-envoy-upstream-service-time',
  '370',
  'apim-request-id',
  'cb9c3e5d-e3ce-48e9-ba64-c04c86c8fa9b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:07:25 GMT'
]);
