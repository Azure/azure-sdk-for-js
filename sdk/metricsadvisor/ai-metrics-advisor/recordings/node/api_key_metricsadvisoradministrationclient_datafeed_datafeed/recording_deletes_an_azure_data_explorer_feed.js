let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/82bb31b5-89a9-4801-924b-0b496573da73')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b959da61-ab6c-42db-8127-0dd6291b1003',
  'x-envoy-upstream-service-time',
  '293',
  'apim-request-id',
  'b959da61-ab6c-42db-8127-0dd6291b1003',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/82bb31b5-89a9-4801-924b-0b496573da73')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e11961b9-590f-4da9-bd14-412895fc5740',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  'e11961b9-590f-4da9-bd14-412895fc5740',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:26 GMT'
]);
