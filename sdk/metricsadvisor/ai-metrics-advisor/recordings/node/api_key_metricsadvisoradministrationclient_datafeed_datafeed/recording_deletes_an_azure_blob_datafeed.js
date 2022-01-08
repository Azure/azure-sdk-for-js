let nock = require('nock');

module.exports.hash = "d9c318776ee205ffe269de16d9c70f34";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5e469479-dfae-4e9f-8ae8-996aea8b1e88')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '02b5733f-ca9b-49d2-9e71-46e7b6c04bdf',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '02b5733f-ca9b-49d2-9e71-46e7b6c04bdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5e469479-dfae-4e9f-8ae8-996aea8b1e88')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '66b3b6e2-acba-45eb-92ca-034fd5616a2e',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '66b3b6e2-acba-45eb-92ca-034fd5616a2e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:03 GMT'
]);
