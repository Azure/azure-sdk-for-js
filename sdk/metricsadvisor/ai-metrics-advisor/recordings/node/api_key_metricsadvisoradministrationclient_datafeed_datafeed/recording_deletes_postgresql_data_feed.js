let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/4d4faf65-0a08-44ce-9b11-4af0573bf187')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c8060b39-4b5f-435e-b1ac-28cbb09dca09',
  'x-envoy-upstream-service-time',
  '298',
  'apim-request-id',
  'c8060b39-4b5f-435e-b1ac-28cbb09dca09',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4d4faf65-0a08-44ce-9b11-4af0573bf187')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '584627c3-ce05-4b9d-b727-26a1063d6479',
  'x-envoy-upstream-service-time',
  '61',
  'apim-request-id',
  '584627c3-ce05-4b9d-b727-26a1063d6479',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:29 GMT'
]);
