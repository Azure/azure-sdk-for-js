let nock = require('nock');

module.exports.hash = "fc0fd3d9f5031d1fc1acd01a8a06d3fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f146af5d-debc-4cd8-941f-e7d902622a50',
  'x-envoy-upstream-service-time',
  '412',
  'apim-request-id',
  'f146af5d-debc-4cd8-941f-e7d902622a50',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d')
  .reply(200, {"hookId":"8ee27014-a775-4e18-b846-8ce3acea698d","hookName":"js-test-emailHook-160530501380902015","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c0a2e205-ae29-4da3-8da9-f53e0aad23ae',
  'x-envoy-upstream-service-time',
  '336',
  'apim-request-id',
  'c0a2e205-ae29-4da3-8da9-f53e0aad23ae',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:36 GMT'
]);
