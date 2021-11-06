let nock = require('nock');

module.exports.hash = "e89845354bda9fbabaf9179fbd12fbc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/604c4044-51e4-4456-b76b-82482d96b45a', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"604c4044-51e4-4456-b76b-82482d96b45a","hookName":"js-test-emailHook-163616448988405339","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bc6af888-3c97-4653-9b47-0f160844dc66',
  'x-envoy-upstream-service-time',
  '562',
  'apim-request-id',
  'bc6af888-3c97-4653-9b47-0f160844dc66',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:13 GMT'
]);
