let nock = require('nock');

module.exports.hash = "64a2c53dff78f25f746efdb14c8b12d1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'a1f2fea8-66c5-49ad-b7eb-b05d5bc60a64',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  'a1f2fea8-66c5-49ad-b7eb-b05d5bc60a64',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:03 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3')
  .reply(200, {"hookId":"9194cb28-ba76-4fac-99c6-092c73e5e1f3","hookName":"js-test-emailHook-161070018056802238","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f056aea1-96d8-4cb3-a0f8-1018dfd29732',
  'x-envoy-upstream-service-time',
  '263',
  'apim-request-id',
  'f056aea1-96d8-4cb3-a0f8-1018dfd29732',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:03 GMT'
]);
