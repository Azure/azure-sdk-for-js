let nock = require('nock');

module.exports.hash = "664ee04c7622dba1427b35fb296bd624";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'b4363fe6-937a-4506-aebb-addaa29d3c0e',
  'x-envoy-upstream-service-time',
  '927',
  'apim-request-id',
  'b4363fe6-937a-4506-aebb-addaa29d3c0e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:38 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac')
  .reply(200, {"hookId":"7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac","hookName":"js-test-webHook-160530501380909561","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a0206272-bc8b-4546-8ce4-10b3ef528707',
  'x-envoy-upstream-service-time',
  '289',
  'apim-request-id',
  'a0206272-bc8b-4546-8ce4-10b3ef528707',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:38 GMT'
]);
