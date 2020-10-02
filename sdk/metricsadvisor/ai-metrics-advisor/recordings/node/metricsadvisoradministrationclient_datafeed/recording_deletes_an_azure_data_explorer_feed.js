let nock = require('nock');

module.exports.hash = "ade9ff173ac49d1648fabd720f0a048d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3606f81a-f933-4014-98bb-d4c2f1adbd3f')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ce82523d-8338-4227-a2ac-28225e99d20f',
  'x-envoy-upstream-service-time',
  '275',
  'apim-request-id',
  'ce82523d-8338-4227-a2ac-28225e99d20f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3606f81a-f933-4014-98bb-d4c2f1adbd3f')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd1bded5a-abe6-4149-bdd3-52b2657cd8bb',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'd1bded5a-abe6-4149-bdd3-52b2657cd8bb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:26 GMT'
]);
