let nock = require('nock');

module.exports.hash = "664ee04c7622dba1427b35fb296bd624";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b20bf64d-6002-4fc5-8dbf-22bc3e01aaa4',
  'x-envoy-upstream-service-time',
  '741',
  'apim-request-id',
  'b20bf64d-6002-4fc5-8dbf-22bc3e01aaa4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212')
  .reply(200, {"hookId":"a24db07b-522a-499f-8239-97c5e7743212","hookName":"js-test-webHook-160529681071104557","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e9e77e6e-dc65-4683-a8f8-cf2455ed1e6a',
  'x-envoy-upstream-service-time',
  '151',
  'apim-request-id',
  'e9e77e6e-dc65-4683-a8f8-cf2455ed1e6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:53 GMT'
]);
