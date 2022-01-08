let nock = require('nock');

module.exports.hash = "c31cfc64ad16634fe6c8bace4d7a4481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/542f4cb3-51d7-4b3b-b7f8-005d9b7758f2', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"542f4cb3-51d7-4b3b-b7f8-005d9b7758f2","hookName":"js-test-webHook-164160824937003901","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5906efd2-dd5f-4b02-a672-b58b52b7fd73',
  'x-envoy-upstream-service-time',
  '1232',
  'apim-request-id',
  '5906efd2-dd5f-4b02-a672-b58b52b7fd73',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:31 GMT'
]);
