let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"8ee27014-a775-4e18-b846-8ce3acea698d","hookName":"js-test-emailHook-160530501380902015","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac","hookName":"js-test-webHook-160530501380909561","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '651',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e1635262-5b4b-4ff9-bb98-31f4661bdc6c',
  'x-envoy-upstream-service-time',
  '199',
  'apim-request-id',
  'e1635262-5b4b-4ff9-bb98-31f4661bdc6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:37 GMT'
]);
