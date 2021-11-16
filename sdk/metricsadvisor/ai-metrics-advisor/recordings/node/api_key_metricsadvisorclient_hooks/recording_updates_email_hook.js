let nock = require('nock');

module.exports.hash = "e89845354bda9fbabaf9179fbd12fbc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/7ba3c3b1-f3d3-4598-ae87-ac584020c641', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"7ba3c3b1-f3d3-4598-ae87-ac584020c641","hookName":"js-test-emailHook-163702282957003574","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '41536fbd-dbe8-4552-8e1a-80fb52c4d163',
  'x-envoy-upstream-service-time',
  '606',
  'apim-request-id',
  '41536fbd-dbe8-4552-8e1a-80fb52c4d163',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:50 GMT'
]);
