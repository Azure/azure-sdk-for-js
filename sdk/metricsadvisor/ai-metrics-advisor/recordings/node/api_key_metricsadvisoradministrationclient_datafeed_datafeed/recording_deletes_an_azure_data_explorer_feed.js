let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7776aa28-c6b6-47b0-9ea6-83b973fd41fe')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6df0e841-7062-44e1-8fc8-b363e94773d0',
  'x-envoy-upstream-service-time',
  '329',
  'apim-request-id',
  '6df0e841-7062-44e1-8fc8-b363e94773d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7776aa28-c6b6-47b0-9ea6-83b973fd41fe')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aa610d70-61dd-40ad-afe2-09bd9e708961',
  'x-envoy-upstream-service-time',
  '85',
  'apim-request-id',
  'aa610d70-61dd-40ad-afe2-09bd9e708961',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:56 GMT'
]);
