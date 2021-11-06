let nock = require('nock');

module.exports.hash = "05858e63ce7f83f298e3aadaccd98c0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/84968cc8-b283-4bce-b2f1-eba0fa853c17', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"84968cc8-b283-4bce-b2f1-eba0fa853c17","hookName":"js-test-webHook-163616448988408780","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cfd67e0a-d194-4470-8a76-67d740e3959a',
  'x-envoy-upstream-service-time',
  '805',
  'apim-request-id',
  'cfd67e0a-d194-4470-8a76-67d740e3959a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:13 GMT'
]);
