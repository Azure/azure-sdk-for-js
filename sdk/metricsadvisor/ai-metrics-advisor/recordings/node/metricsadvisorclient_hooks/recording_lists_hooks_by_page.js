let nock = require('nock');

module.exports.hash = "dcaee46d0224346b07b3d745415de1d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"6d3f3d41-4114-458d-bf45-a3fbcd78a400","hookName":"js-test-emailHook-160530449676503144","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '411',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a2c28b8d-dd74-497e-b9d2-64627eba9c25',
  'x-envoy-upstream-service-time',
  '114',
  'apim-request-id',
  'a2c28b8d-dd74-497e-b9d2-64627eba9c25',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:00 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"20f65cc3-2f21-44b8-ab83-0040da955bc5","hookName":"js-test-webHook-160530449676502399","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '496',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8e203eb8-8145-47a3-afa5-b152dfbb782e',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  '8e203eb8-8145-47a3-afa5-b152dfbb782e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:55:01 GMT'
]);
