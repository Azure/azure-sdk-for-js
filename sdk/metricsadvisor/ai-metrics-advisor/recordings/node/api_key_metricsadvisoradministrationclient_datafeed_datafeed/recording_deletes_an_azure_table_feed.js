let nock = require('nock');

module.exports.hash = "b532a46235a6167fe37a0601d68211ca";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e29f7df5-d2db-45c9-b67f-49124a2188e0')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cd95f499-0ed9-471d-9887-726216947f76',
  'x-envoy-upstream-service-time',
  '339',
  'apim-request-id',
  'cd95f499-0ed9-471d-9887-726216947f76',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:07 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e29f7df5-d2db-45c9-b67f-49124a2188e0')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '91d7ee39-4155-4e29-a598-74efc26a108b',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  '91d7ee39-4155-4e29-a598-74efc26a108b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:08 GMT'
]);
