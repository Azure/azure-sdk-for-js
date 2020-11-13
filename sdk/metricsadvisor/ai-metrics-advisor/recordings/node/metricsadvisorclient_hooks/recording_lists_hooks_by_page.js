let nock = require('nock');

module.exports.hash = "dcaee46d0224346b07b3d745415de1d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"5e24aead-09d6-4bf7-be95-da5340b82e4a","hookName":"js-test-emailHook-160523011294203867","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '390',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4e7295c6-56d8-472b-8a27-b4ab9832b1c3',
  'x-envoy-upstream-service-time',
  '116',
  'apim-request-id',
  '4e7295c6-56d8-472b-8a27-b4ab9832b1c3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"78ee2629-4750-4511-8b11-961cbffc2aa9","hookName":"js-test-webHook-160523011294301028","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '492',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '01c2d60f-d231-410c-96b4-4b6dd7134e23',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '01c2d60f-d231-410c-96b4-4b6dd7134e23',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:18 GMT'
]);
