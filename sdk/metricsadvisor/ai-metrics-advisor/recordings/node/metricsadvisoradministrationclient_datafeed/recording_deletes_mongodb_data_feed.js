let nock = require('nock');

module.exports.hash = "da43e5372d36f323b35774198a317621";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/83977ee0-926c-49b5-a9d7-4d9000c1ca04')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '09959662-5d21-45c8-b5af-381abacbc1f4',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  '09959662-5d21-45c8-b5af-381abacbc1f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/83977ee0-926c-49b5-a9d7-4d9000c1ca04')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '88c632be-952b-4543-8ae7-28c3662d0c8b',
  'x-envoy-upstream-service-time',
  '45',
  'apim-request-id',
  '88c632be-952b-4543-8ae7-28c3662d0c8b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 23:29:37 GMT'
]);
