let nock = require('nock');

module.exports.hash = "664ee04c7622dba1427b35fb296bd624";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'c224e347-c040-453d-8304-b435485b7990',
  'x-envoy-upstream-service-time',
  '660',
  'apim-request-id',
  'c224e347-c040-453d-8304-b435485b7990',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:59 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5')
  .reply(200, {"hookId":"20f65cc3-2f21-44b8-ab83-0040da955bc5","hookName":"js-test-webHook-160530449676502399","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ef4a6019-0fc9-4cc0-8283-baabbdb2433b',
  'x-envoy-upstream-service-time',
  '236',
  'apim-request-id',
  'ef4a6019-0fc9-4cc0-8283-baabbdb2433b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:59 GMT'
]);
