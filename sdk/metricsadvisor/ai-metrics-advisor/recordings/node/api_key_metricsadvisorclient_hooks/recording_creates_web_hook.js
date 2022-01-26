let nock = require('nock');

module.exports.hash = "3a643b38d3c3b48fc752795914d107ef";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-164264038100303372","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1',
  'x-request-id',
  '4393fd12-d3d5-48bb-8a09-c154223fabd1',
  'x-envoy-upstream-service-time',
  '349',
  'apim-request-id',
  '4393fd12-d3d5-48bb-8a09-c154223fabd1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1')
  .reply(200, {"hookId":"5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1","hookName":"js-test-webHook-164264038100303372","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ccad8ee9-f39d-49f9-b5cf-fe182f67a2ea',
  'x-envoy-upstream-service-time',
  '149',
  'apim-request-id',
  'ccad8ee9-f39d-49f9-b5cf-fe182f67a2ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:41 GMT'
]);
