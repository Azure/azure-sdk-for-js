let nock = require('nock');

module.exports.hash = "05858e63ce7f83f298e3aadaccd98c0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('//metricsadvisor/v1.0/hooks/1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b","hookName":"js-test-webHook-163978361806507112","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a5b4bd1a-4c8d-4013-9eb0-b189e3d84fe5',
  'x-envoy-upstream-service-time',
  '618',
  'apim-request-id',
  'a5b4bd1a-4c8d-4013-9eb0-b189e3d84fe5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:27:00 GMT'
]);
