let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"776297a1-f283-420e-beb2-cc0564b4d7dc","hookName":"js-test-emailHook-160522268489006407","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"44eec0cb-3b62-4e46-a830-cf5b2592dfa8","hookName":"js-test-webHook-160522268489009591","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '626',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '29c70df4-418e-45cb-9a03-90a91b73c90e',
  'x-envoy-upstream-service-time',
  '206',
  'apim-request-id',
  '29c70df4-418e-45cb-9a03-90a91b73c90e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:30 GMT'
]);
