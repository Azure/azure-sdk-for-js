let nock = require('nock');

module.exports.hash = "dcaee46d0224346b07b3d745415de1d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"c2696e26-17f0-4c9f-9aa3-1982e7fed1bc","hookName":"js-test-emailHook-160529681071108921","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '411',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4b7e209e-5fdd-4d41-8684-6c17a1ede987',
  'x-envoy-upstream-service-time',
  '98',
  'apim-request-id',
  '4b7e209e-5fdd-4d41-8684-6c17a1ede987',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:53 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"a24db07b-522a-499f-8239-97c5e7743212","hookName":"js-test-webHook-160529681071104557","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '496',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fff6427a-7c1f-4488-a206-be863e0006b4',
  'x-envoy-upstream-service-time',
  '93',
  'apim-request-id',
  'fff6427a-7c1f-4488-a206-be863e0006b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:53 GMT'
]);
