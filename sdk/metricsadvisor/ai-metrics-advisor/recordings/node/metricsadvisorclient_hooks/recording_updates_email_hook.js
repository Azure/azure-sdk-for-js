let nock = require('nock');

module.exports.hash = "fc0fd3d9f5031d1fc1acd01a8a06d3fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3233a22e-ee82-4e75-8023-a27d06a2a72f',
  'x-envoy-upstream-service-time',
  '539',
  'apim-request-id',
  '3233a22e-ee82-4e75-8023-a27d06a2a72f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a')
  .reply(200, {"hookId":"5e24aead-09d6-4bf7-be95-da5340b82e4a","hookName":"js-test-emailHook-160523011294203867","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '501ac0c3-4109-4afe-9b2f-f2c8a11b6929',
  'x-envoy-upstream-service-time',
  '220',
  'apim-request-id',
  '501ac0c3-4109-4afe-9b2f-f2c8a11b6929',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:15 GMT'
]);
