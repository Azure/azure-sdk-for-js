let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/f70f5e49-1f05-452a-bfa0-dde716c6bfb2')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '52795ba2-f757-4cb2-b4fe-524452ca7aa4',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  '52795ba2-f757-4cb2-b4fe-524452ca7aa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/f70f5e49-1f05-452a-bfa0-dde716c6bfb2')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '67552a0c-c3d4-435d-a53f-bd9f823632bc',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '67552a0c-c3d4-435d-a53f-bd9f823632bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:06 GMT'
]);
