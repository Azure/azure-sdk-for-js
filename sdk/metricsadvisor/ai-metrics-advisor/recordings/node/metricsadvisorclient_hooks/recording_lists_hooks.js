let nock = require('nock');

module.exports.hash = "77f8bd80ceb5fdbaaefbbe0295803305";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70","hookName":"js-test-emailHook-160073143932207624","hookType":"Email","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"],"ccList":null,"bccList":null}},{"hookId":"d082f519-d49c-48f8-824c-8579952c6270","hookName":"js-test-webHook-160073143932209816","hookType":"Webhook","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":null}, [
  'Content-Length',
  '678',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '759d1bb0-bb07-440b-be07-4cf1540c7085',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '759d1bb0-bb07-440b-be07-4cf1540c7085',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:26 GMT'
]);
