let nock = require('nock');

module.exports.hash = "1cd5a23293e59e09b1eb088dbf2be7c4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/3c4d0330-14bd-4162-a32e-d55fc3edb1e3')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '23ab634f-181e-4948-b4a6-15e239f51a88',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  '23ab634f-181e-4948-b4a6-15e239f51a88',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/3c4d0330-14bd-4162-a32e-d55fc3edb1e3')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6902632b-686e-4019-83dd-d421171eafb4',
  'x-envoy-upstream-service-time',
  '43',
  'apim-request-id',
  '6902632b-686e-4019-83dd-d421171eafb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 22:02:50 GMT'
]);
