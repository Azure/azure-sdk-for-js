let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"c2696e26-17f0-4c9f-9aa3-1982e7fed1bc","hookName":"js-test-emailHook-160529681071108921","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"a24db07b-522a-499f-8239-97c5e7743212","hookName":"js-test-webHook-160529681071104557","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '651',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0441f9ac-3aef-4073-84d3-4f5b04ee12e1',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  '0441f9ac-3aef-4073-84d3-4f5b04ee12e1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:53 GMT'
]);
