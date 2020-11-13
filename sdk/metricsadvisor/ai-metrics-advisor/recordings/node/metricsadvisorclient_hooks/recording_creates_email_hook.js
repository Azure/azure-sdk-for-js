let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160523011294203867","js-test-webHook-":"js-test-webHook-160523011294301028"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160523011294203867","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a',
  'x-request-id',
  '9293514e-5593-4a4b-8b61-b097c7e77e35',
  'x-envoy-upstream-service-time',
  '705',
  'apim-request-id',
  '9293514e-5593-4a4b-8b61-b097c7e77e35',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:13 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5e24aead-09d6-4bf7-be95-da5340b82e4a')
  .reply(200, {"hookId":"5e24aead-09d6-4bf7-be95-da5340b82e4a","hookName":"js-test-emailHook-160523011294203867","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '220b7c38-1ded-4117-9e93-ebecbd8d508f',
  'x-envoy-upstream-service-time',
  '552',
  'apim-request-id',
  '220b7c38-1ded-4117-9e93-ebecbd8d508f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:14 GMT'
]);
