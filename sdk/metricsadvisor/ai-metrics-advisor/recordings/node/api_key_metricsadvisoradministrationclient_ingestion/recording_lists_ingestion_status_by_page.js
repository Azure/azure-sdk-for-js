let nock = require('nock');

module.exports.hash = "2fcf1abe7a40299b4ef9d153ec88dbd5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-30T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f763e017-f28c-4345-8d87-0839d4adf76a',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  'f763e017-f28c-4345-8d87-0839d4adf76a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:55 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2021-10-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2021-10-28T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '338',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e3f0412f-b3ba-4561-afc7-950f1d5bca62',
  'x-envoy-upstream-service-time',
  '217',
  'apim-request-id',
  'e3f0412f-b3ba-4561-afc7-950f1d5bca62',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:55 GMT'
]);
