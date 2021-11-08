let nock = require('nock');

module.exports.hash = "b0c83db2ad12c350bcb94d53ad5d50c6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/91b4e6ee-bc42-462a-b64c-f11672cbc5e3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '1eddbb9b-4620-48e8-b8ff-cbbd865a163d',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  '1eddbb9b-4620-48e8-b8ff-cbbd865a163d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/91b4e6ee-bc42-462a-b64c-f11672cbc5e3')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2e37d6cc-3ec1-4c51-b0b5-0c6c4498cbce',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  '2e37d6cc-3ec1-4c51-b0b5-0c6c4498cbce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:27 GMT'
]);
