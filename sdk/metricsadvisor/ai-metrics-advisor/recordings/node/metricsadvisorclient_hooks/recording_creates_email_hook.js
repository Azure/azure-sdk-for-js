let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160522268489006407","js-test-webHook-":"js-test-webHook-160522268489009591"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160522268489006407","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/776297a1-f283-420e-beb2-cc0564b4d7dc',
  'x-request-id',
  '926c9c37-9e66-4a3b-85b7-d37fb40205b5',
  'x-envoy-upstream-service-time',
  '556',
  'apim-request-id',
  '926c9c37-9e66-4a3b-85b7-d37fb40205b5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:25 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/776297a1-f283-420e-beb2-cc0564b4d7dc')
  .reply(200, {"hookId":"776297a1-f283-420e-beb2-cc0564b4d7dc","hookName":"js-test-emailHook-160522268489006407","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4b26eec0-eff9-443a-bb81-8f8b7d8a6528',
  'x-envoy-upstream-service-time',
  '726',
  'apim-request-id',
  '4b26eec0-eff9-443a-bb81-8f8b7d8a6528',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:25 GMT'
]);
