let nock = require('nock');

module.exports.hash = "296b1dbcef57360a0b8d87b9d57c71a0";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-162105184287406231","js-test-webHook-":"js-test-webHook-162105184287407101"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-162105184287406231","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214',
  'x-request-id',
  'c9ebc32c-689a-4d33-a385-20febd59c211',
  'x-envoy-upstream-service-time',
  '455',
  'apim-request-id',
  'c9ebc32c-689a-4d33-a385-20febd59c211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214')
  .reply(200, {"hookId":"f07da91b-3d76-4317-a0b1-ddc56e74e214","hookName":"js-test-emailHook-162105184287406231","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c34f9f85-e411-40e4-a14f-fe46e3a6e43f',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  'c34f9f85-e411-40e4-a14f-fe46e3a6e43f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:43 GMT'
]);
