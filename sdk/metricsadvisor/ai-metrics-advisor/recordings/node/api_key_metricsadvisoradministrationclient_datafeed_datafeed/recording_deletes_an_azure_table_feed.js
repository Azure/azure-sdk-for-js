let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/7a3e9ddc-6293-4592-975c-cf3f4489ca38')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '6dc8dd98-711f-40bb-8d10-0ff5ff4981b8',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '6dc8dd98-711f-40bb-8d10-0ff5ff4981b8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/7a3e9ddc-6293-4592-975c-cf3f4489ca38')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '43347365-3c8f-41b8-8118-c9fa28f3d61f',
  'x-envoy-upstream-service-time',
  '66',
  'apim-request-id',
  '43347365-3c8f-41b8-8118-c9fa28f3d61f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:27 GMT'
]);
