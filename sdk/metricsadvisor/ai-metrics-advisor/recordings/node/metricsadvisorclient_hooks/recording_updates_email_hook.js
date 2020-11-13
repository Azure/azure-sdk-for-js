let nock = require('nock');

module.exports.hash = "fc0fd3d9f5031d1fc1acd01a8a06d3fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '68d6543e-e910-4c2f-9e6c-af5c62f42c5a',
  'x-envoy-upstream-service-time',
  '496',
  'apim-request-id',
  '68d6543e-e910-4c2f-9e6c-af5c62f42c5a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400')
  .reply(200, {"hookId":"6d3f3d41-4114-458d-bf45-a3fbcd78a400","hookName":"js-test-emailHook-160530449676503144","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '87a6fe68-b6ed-46d0-8b36-b9a2c31b585a',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '87a6fe68-b6ed-46d0-8b36-b9a2c31b585a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:59 GMT'
]);
