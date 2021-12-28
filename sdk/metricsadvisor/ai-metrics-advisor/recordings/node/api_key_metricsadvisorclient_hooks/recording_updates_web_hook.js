let nock = require('nock');

module.exports.hash = "05858e63ce7f83f298e3aadaccd98c0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/e86dd6fb-ec6a-4b29-98f5-172a91f3db69', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"e86dd6fb-ec6a-4b29-98f5-172a91f3db69","hookName":"js-test-webHook-163702282957004992","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fcdf04bf-7390-4209-80ce-6d46452b3dcb',
  'x-envoy-upstream-service-time',
  '601',
  'apim-request-id',
  'fcdf04bf-7390-4209-80ce-6d46452b3dcb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:52 GMT'
]);
