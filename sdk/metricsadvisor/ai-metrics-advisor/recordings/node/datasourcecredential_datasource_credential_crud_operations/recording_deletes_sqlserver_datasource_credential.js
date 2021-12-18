let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/fd1ceed7-0f5a-4867-83f7-e5a75d128458')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '4ca99ba3-1eae-4f29-978c-08f497cae1f3',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  '4ca99ba3-1eae-4f29-978c-08f497cae1f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);

nock('https://endpoint/:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/fd1ceed7-0f5a-4867-83f7-e5a75d128458')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8101b37c-494b-4284-9e7d-b79bff98ba50',
  'x-envoy-upstream-service-time',
  '74',
  'apim-request-id',
  '8101b37c-494b-4284-9e7d-b79bff98ba50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 18 Dec 2021 00:56:00 GMT'
]);
