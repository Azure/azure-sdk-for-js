let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f307d2b5-d035-4ac0-ad4c-ac5fca4b5874')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '167a6c1b-ae75-4d3e-a7e0-39becc3366e5',
  'x-envoy-upstream-service-time',
  '296',
  'apim-request-id',
  '167a6c1b-ae75-4d3e-a7e0-39becc3366e5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f307d2b5-d035-4ac0-ad4c-ac5fca4b5874')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b85c8964-1d73-4cfa-8126-42f33348a8c9',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'b85c8964-1d73-4cfa-8126-42f33348a8c9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:06 GMT'
]);
