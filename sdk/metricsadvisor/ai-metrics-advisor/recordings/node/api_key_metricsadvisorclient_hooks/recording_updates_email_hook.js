let nock = require('nock');

module.exports.hash = "e89845354bda9fbabaf9179fbd12fbc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/aee75965-9331-427a-a6c1-c9e5d3999ed1', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"aee75965-9331-427a-a6c1-c9e5d3999ed1","hookName":"js-test-emailHook-163651112651907744","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '423264b9-d18e-42c2-a0ef-004c41142c00',
  'x-envoy-upstream-service-time',
  '673',
  'apim-request-id',
  '423264b9-d18e-42c2-a0ef-004c41142c00',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:29 GMT'
]);
