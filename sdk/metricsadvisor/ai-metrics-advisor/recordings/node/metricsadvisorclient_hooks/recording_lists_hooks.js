let nock = require('nock');

module.exports.hash = "70edbaf8153517593b6c88256917bae3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"6d3f3d41-4114-458d-bf45-a3fbcd78a400","hookName":"js-test-emailHook-160530449676503144","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"20f65cc3-2f21-44b8-ab83-0040da955bc5","hookName":"js-test-webHook-160530449676502399","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '651',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '47f367ed-10eb-4a27-abae-40f143654263',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '47f367ed-10eb-4a27-abae-40f143654263',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:59 GMT'
]);
