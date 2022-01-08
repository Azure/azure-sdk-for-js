let nock = require('nock');

module.exports.hash = "3a643b38d3c3b48fc752795914d107ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-164160824937003901","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/542f4cb3-51d7-4b3b-b7f8-005d9b7758f2',
  'x-request-id',
  '6e513606-666c-4447-aa9f-b38742272dd3',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  '6e513606-666c-4447-aa9f-b38742272dd3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/542f4cb3-51d7-4b3b-b7f8-005d9b7758f2')
  .reply(200, {"hookId":"542f4cb3-51d7-4b3b-b7f8-005d9b7758f2","hookName":"js-test-webHook-164160824937003901","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '68ad1c49-0751-42b4-bc82-4c2bf4a3d027',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '68ad1c49-0751-42b4-bc82-4c2bf4a3d027',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:29 GMT'
]);
