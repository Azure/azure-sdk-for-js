let nock = require('nock');

module.exports.hash = "95c25f09cf194bdeaa62de3da2b4d804";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/a654d667-857c-450d-9470-fe3a94058572')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3fd25032-3a7b-404b-bc4e-ee8198ad93dd',
  'x-envoy-upstream-service-time',
  '280',
  'apim-request-id',
  '3fd25032-3a7b-404b-bc4e-ee8198ad93dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/a654d667-857c-450d-9470-fe3a94058572')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1cf86d00-ba41-41d6-aceb-9b5f6a4356cd',
  'x-envoy-upstream-service-time',
  '78',
  'apim-request-id',
  '1cf86d00-ba41-41d6-aceb-9b5f6a4356cd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:59 GMT'
]);
