let nock = require('nock');

module.exports.hash = "62bf2de974cc718245b0129b75e1b5e7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bd64c30e-1a5a-4b03-8533-8f2f5b6df8d5',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  'bd64c30e-1a5a-4b03-8533-8f2f5b6df8d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/c9f1fa76-72b9-4218-9fc5-08f1a0dd4ffc')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ea668f58-4643-4ab6-b65f-5ff3acf55c66',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'ea668f58-4643-4ab6-b65f-5ff3acf55c66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:20 GMT'
]);
