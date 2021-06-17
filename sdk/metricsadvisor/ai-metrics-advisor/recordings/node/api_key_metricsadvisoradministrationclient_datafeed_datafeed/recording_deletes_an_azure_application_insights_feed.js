let nock = require('nock');

module.exports.hash = "649ff33f6dd8c7706f7f70061b6b7b8e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/dc7ef668-0f8c-43fb-a398-f7cb22e4c391')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '18c97f69-d641-4caf-bc4c-b37453898940',
  'x-envoy-upstream-service-time',
  '387',
  'apim-request-id',
  '18c97f69-d641-4caf-bc4c-b37453898940',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/dc7ef668-0f8c-43fb-a398-f7cb22e4c391')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1ce377bf-8ce6-4182-893f-f110a0f25505',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '1ce377bf-8ce6-4182-893f-f110a0f25505',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:57 GMT'
]);
