let nock = require('nock');

module.exports.hash = "bd302ce0f4c49f36cc5e3e1ffd1ee427";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/38939295-00b9-417e-9e2b-fd82e66010f1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '457931da-6bdf-49ad-9ec6-09bdfc450ce4',
  'x-envoy-upstream-service-time',
  '410',
  'apim-request-id',
  '457931da-6bdf-49ad-9ec6-09bdfc450ce4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/38939295-00b9-417e-9e2b-fd82e66010f1')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '794a6133-f441-416b-952e-43c7f7913571',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '794a6133-f441-416b-952e-43c7f7913571',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 04:05:36 GMT'
]);
