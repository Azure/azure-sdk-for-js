let nock = require('nock');

module.exports.hash = "a1d3a10261a694cb6001ff6fe8dae56c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd295249e-c09d-4eca-bb2c-b225e0323037',
  'x-envoy-upstream-service-time',
  '516',
  'apim-request-id',
  'd295249e-c09d-4eca-bb2c-b225e0323037',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/f07da91b-3d76-4317-a0b1-ddc56e74e214')
  .reply(200, {"hookId":"f07da91b-3d76-4317-a0b1-ddc56e74e214","hookName":"js-test-emailHook-162105184287406231","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '89850084-f273-4cda-a2fb-863ac82f1754',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '89850084-f273-4cda-a2fb-863ac82f1754',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:45 GMT'
]);
