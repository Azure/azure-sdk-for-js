let nock = require('nock');

module.exports.hash = "1c9c6f5ddf343a9d58faf78136ec1f80";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/d198fec8-53fe-47ca-93a3-421c8c1adcbc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a91fdbe1-8d3c-4c84-becc-4767b568f75f',
  'x-envoy-upstream-service-time',
  '278',
  'apim-request-id',
  'a91fdbe1-8d3c-4c84-becc-4767b568f75f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/d198fec8-53fe-47ca-93a3-421c8c1adcbc')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ee3e226f-e8e2-48ab-a136-05df91e18ebf',
  'x-envoy-upstream-service-time',
  '46',
  'apim-request-id',
  'ee3e226f-e8e2-48ab-a136-05df91e18ebf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:20 GMT'
]);
