let nock = require('nock');

module.exports.hash = "c31cfc64ad16634fe6c8bace4d7a4481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1","hookName":"js-test-webHook-164264038100303372","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a6386678-fbef-44a3-838c-aba9e09bd40a',
  'x-envoy-upstream-service-time',
  '518',
  'apim-request-id',
  'a6386678-fbef-44a3-838c-aba9e09bd40a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
]);
