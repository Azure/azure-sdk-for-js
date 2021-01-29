let nock = require('nock');

module.exports.hash = "9e11a3334bdeb420dc718a0b9ac71781";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"9194cb28-ba76-4fac-99c6-092c73e5e1f3","hookName":"js-test-emailHook-161070018056802238","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '411',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9020ed5f-548d-4e48-8fb1-59a3b8c66d1d',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  '9020ed5f-548d-4e48-8fb1-59a3b8c66d1d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"b1c3c74b-ed83-41aa-8716-dbe12c741940","hookName":"js-test-webHook-161070018056805597","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '496',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fb5fe40b-1d20-4609-951e-38b51151f811',
  'x-envoy-upstream-service-time',
  '113',
  'apim-request-id',
  'fb5fe40b-1d20-4609-951e-38b51151f811',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:05 GMT'
]);
