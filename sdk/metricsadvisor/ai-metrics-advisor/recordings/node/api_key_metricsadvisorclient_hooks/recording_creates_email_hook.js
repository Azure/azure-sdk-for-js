let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163651112651907744","js-test-webHook-":"js-test-webHook-163651112651900484"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163651112651907744","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/aee75965-9331-427a-a6c1-c9e5d3999ed1',
  'x-request-id',
  '038d2b51-ab56-480d-8598-0fda707258bc',
  'x-envoy-upstream-service-time',
  '579',
  'apim-request-id',
  '038d2b51-ab56-480d-8598-0fda707258bc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/aee75965-9331-427a-a6c1-c9e5d3999ed1')
  .reply(200, {"hookId":"aee75965-9331-427a-a6c1-c9e5d3999ed1","hookName":"js-test-emailHook-163651112651907744","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1d8bfd47-d93c-4f82-a78f-71f7e8b8968f',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  '1d8bfd47-d93c-4f82-a78f-71f7e8b8968f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:27 GMT'
]);
