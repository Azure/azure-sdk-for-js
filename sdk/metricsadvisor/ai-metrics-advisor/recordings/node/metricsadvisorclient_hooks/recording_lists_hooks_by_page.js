let nock = require('nock');

module.exports.hash = "dcaee46d0224346b07b3d745415de1d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"8ee27014-a775-4e18-b846-8ce3acea698d","hookName":"js-test-emailHook-160530501380902015","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '411',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8cdaf2fb-ea11-4e10-b702-115c3e143c84',
  'x-envoy-upstream-service-time',
  '283',
  'apim-request-id',
  '8cdaf2fb-ea11-4e10-b702-115c3e143c84',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac","hookName":"js-test-webHook-160530501380909561","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '496',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '26483c48-f888-41c7-baf6-d076d4e9b648',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  '26483c48-f888-41c7-baf6-d076d4e9b648',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:38 GMT'
]);
