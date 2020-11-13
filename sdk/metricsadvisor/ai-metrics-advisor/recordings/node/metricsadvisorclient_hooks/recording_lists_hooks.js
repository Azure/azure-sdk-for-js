let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"5e24aead-09d6-4bf7-be95-da5340b82e4a","hookName":"js-test-emailHook-160523011294203867","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"78ee2629-4750-4511-8b11-961cbffc2aa9","hookName":"js-test-webHook-160523011294301028","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '647',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a637a01e-a174-4dfc-b0ab-55ca6ca33583',
  'x-envoy-upstream-service-time',
  '444',
  'apim-request-id',
  'a637a01e-a174-4dfc-b0ab-55ca6ca33583',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:17 GMT'
]);
