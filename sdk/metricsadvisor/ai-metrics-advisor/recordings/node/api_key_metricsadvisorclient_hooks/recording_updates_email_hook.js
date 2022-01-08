let nock = require('nock');

module.exports.hash = "03004999568a01eebe9d7058fd699a5a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/c910532f-b41f-460f-af19-1c6c524b6562', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"c910532f-b41f-460f-af19-1c6c524b6562","hookName":"js-test-emailHook-164160824937001754","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5132645a-fe85-4886-be3e-5d174f76b101',
  'x-envoy-upstream-service-time',
  '470',
  'apim-request-id',
  '5132645a-fe85-4886-be3e-5d174f76b101',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:30 GMT'
]);
