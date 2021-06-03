let nock = require('nock');

module.exports.hash = "3467b9577b6a0cbbc2fd9cd5043145f0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'e325f7d6-7b34-4c44-bf61-ad3bc8080c1a',
  'x-envoy-upstream-service-time',
  '416',
  'apim-request-id',
  'e325f7d6-7b34-4c44-bf61-ad3bc8080c1a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/47336207-4e5e-4fd3-997b-20d5428537d5')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9bf6d009-8ac2-4f36-9081-c6788516253d',
  'x-envoy-upstream-service-time',
  '92',
  'apim-request-id',
  '9bf6d009-8ac2-4f36-9081-c6788516253d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:57 GMT'
]);
