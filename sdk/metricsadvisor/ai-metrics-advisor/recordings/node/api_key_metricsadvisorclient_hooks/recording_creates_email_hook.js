let nock = require('nock');

module.exports.hash = "91d3d06711b1681805cbc9acda693f60";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-164160824937001754","js-test-webHook-":"js-test-webHook-164160824937003901"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-164160824937001754","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/c910532f-b41f-460f-af19-1c6c524b6562',
  'x-request-id',
  '2f82e5e1-0dba-403a-a0ad-bae2b1c3b2f3',
  'x-envoy-upstream-service-time',
  '281',
  'apim-request-id',
  '2f82e5e1-0dba-403a-a0ad-bae2b1c3b2f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c910532f-b41f-460f-af19-1c6c524b6562')
  .reply(200, {"hookId":"c910532f-b41f-460f-af19-1c6c524b6562","hookName":"js-test-emailHook-164160824937001754","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5d723906-6b20-452c-917e-1399784dd793',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '5d723906-6b20-452c-917e-1399784dd793',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:29 GMT'
]);
