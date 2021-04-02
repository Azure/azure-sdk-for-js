let nock = require('nock');

module.exports.hash = "777c512b7287926c2d6ff181e6b1e861";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"9194cb28-ba76-4fac-99c6-092c73e5e1f3","hookName":"js-test-emailHook-161070018056802238","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"b1c3c74b-ed83-41aa-8716-dbe12c741940","hookName":"js-test-webHook-161070018056805597","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '651',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f9903401-2886-421b-85c2-2f5ab87d1a26',
  'x-envoy-upstream-service-time',
  '117',
  'apim-request-id',
  'f9903401-2886-421b-85c2-2f5ab87d1a26',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:05 GMT'
]);
