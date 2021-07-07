let nock = require('nock');

module.exports.hash = "a7e884bf029eb2cbf4e153650529df49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/credentials/9baffa37-510f-4926-b6a4-06b90fac549c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f1bb6854-8b46-4fd2-af8b-b0ac389bd57f',
  'x-envoy-upstream-service-time',
  '366',
  'apim-request-id',
  'f1bb6854-8b46-4fd2-af8b-b0ac389bd57f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/credentials/9baffa37-510f-4926-b6a4-06b90fac549c')
  .reply(404, {"code":"404 NOT_FOUND","message":"credentialId is invalid."}, [
  'Content-Length',
  '61',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bb200978-9f82-481d-9584-085dbf3a1c13',
  'x-envoy-upstream-service-time',
  '137',
  'apim-request-id',
  'bb200978-9f82-481d-9584-085dbf3a1c13',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 03 Jul 2021 02:26:59 GMT'
]);
