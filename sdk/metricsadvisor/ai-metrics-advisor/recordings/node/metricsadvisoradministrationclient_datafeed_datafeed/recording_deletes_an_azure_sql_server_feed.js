let nock = require('nock');

module.exports.hash = "5903ecd61268730ba84c099b6ea4c4de";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/abd23bd5-d694-4ae1-a073-31280403b809')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd6add464-19a1-4448-a267-0ac0c63b2d96',
  'x-envoy-upstream-service-time',
  '279',
  'apim-request-id',
  'd6add464-19a1-4448-a267-0ac0c63b2d96',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/abd23bd5-d694-4ae1-a073-31280403b809')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fd0c5ec1-c2e9-48b8-a394-9b7cb4202a4b',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  'fd0c5ec1-c2e9-48b8-a394-9b7cb4202a4b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:42 GMT'
]);
