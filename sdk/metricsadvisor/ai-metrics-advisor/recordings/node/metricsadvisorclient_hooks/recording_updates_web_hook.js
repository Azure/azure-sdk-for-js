let nock = require('nock');

module.exports.hash = "664ee04c7622dba1427b35fb296bd624";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f1daade8-c17e-4b9a-8b93-31fffc2d2754',
  'x-envoy-upstream-service-time',
  '1028',
  'apim-request-id',
  'f1daade8-c17e-4b9a-8b93-31fffc2d2754',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9')
  .reply(200, {"hookId":"78ee2629-4750-4511-8b11-961cbffc2aa9","hookName":"js-test-webHook-160523011294301028","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'aca323b5-ee50-4ac3-8053-9c13fa7d70f7',
  'x-envoy-upstream-service-time',
  '192',
  'apim-request-id',
  'aca323b5-ee50-4ac3-8053-9c13fa7d70f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:16 GMT'
]);
