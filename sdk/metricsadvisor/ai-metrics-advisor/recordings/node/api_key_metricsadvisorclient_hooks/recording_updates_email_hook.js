let nock = require('nock');

module.exports.hash = "03004999568a01eebe9d7058fd699a5a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/afe109eb-27f8-42d3-be1f-cad1a1f0da54', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"afe109eb-27f8-42d3-be1f-cad1a1f0da54","hookName":"js-test-emailHook-164264038100308708","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5a80990b-6c0a-42fa-bfcd-81f68f5b2786',
  'x-envoy-upstream-service-time',
  '478',
  'apim-request-id',
  '5a80990b-6c0a-42fa-bfcd-81f68f5b2786',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:41 GMT'
]);
