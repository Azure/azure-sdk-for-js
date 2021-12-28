let nock = require('nock');

module.exports.hash = "70567b49536730af02fa9c4263794cca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/22475f61-f031-40d7-8a14-f7407c247cee')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '49575714-d8c8-4905-808d-128743b52557',
  'x-envoy-upstream-service-time',
  '287',
  'apim-request-id',
  '49575714-d8c8-4905-808d-128743b52557',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/22475f61-f031-40d7-8a14-f7407c247cee')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fe9a5000-0957-4640-9a0d-d45cf7106e5d',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  'fe9a5000-0957-4640-9a0d-d45cf7106e5d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:30 GMT'
]);
