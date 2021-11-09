let nock = require('nock');

module.exports.hash = "e89845354bda9fbabaf9179fbd12fbc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/2531af07-9d0f-4cda-9b03-4284a940c710', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"2531af07-9d0f-4cda-9b03-4284a940c710","hookName":"js-test-emailHook-163636435782600770","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5065bf4c-2cbb-4aab-94dc-2515ae213b9a',
  'x-envoy-upstream-service-time',
  '532',
  'apim-request-id',
  '5065bf4c-2cbb-4aab-94dc-2515ae213b9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:19 GMT'
]);
