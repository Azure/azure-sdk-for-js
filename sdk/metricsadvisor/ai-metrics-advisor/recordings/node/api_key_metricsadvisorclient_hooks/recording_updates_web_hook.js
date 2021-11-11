let nock = require('nock');

module.exports.hash = "05858e63ce7f83f298e3aadaccd98c0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/5dfb93fa-fc9a-4725-af2b-c604e303336b', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"5dfb93fa-fc9a-4725-af2b-c604e303336b","hookName":"js-test-webHook-163636435782604310","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}, [
  'Content-Length',
  '305',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '569d4bf4-8462-45d6-ae0a-fa29fc0ee329',
  'x-envoy-upstream-service-time',
  '1092',
  'apim-request-id',
  '569d4bf4-8462-45d6-ae0a-fa29fc0ee329',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:20 GMT'
]);
