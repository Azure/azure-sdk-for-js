let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/46342f2d-1b94-4e58-8ab8-3d35d5807157')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e1fc1052-dc0b-4599-8e6e-34c68cfd297f',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  'e1fc1052-dc0b-4599-8e6e-34c68cfd297f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/46342f2d-1b94-4e58-8ab8-3d35d5807157')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c3283865-ff22-4e6b-90c0-40674cf4ed11',
  'x-envoy-upstream-service-time',
  '73',
  'apim-request-id',
  'c3283865-ff22-4e6b-90c0-40674cf4ed11',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:35 GMT'
]);
