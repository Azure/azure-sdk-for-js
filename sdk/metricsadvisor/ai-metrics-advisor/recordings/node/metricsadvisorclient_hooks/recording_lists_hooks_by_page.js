let nock = require('nock');

module.exports.hash = "9440922f141fc42ae374c5d114e16033";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70","hookName":"js-test-emailHook-160073143932207624","hookType":"Email","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"],"ccList":null,"bccList":null}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '442',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'acf5f3b0-6927-4959-8b2d-f14926020264',
  'x-envoy-upstream-service-time',
  '2748',
  'apim-request-id',
  'acf5f3b0-6927-4959-8b2d-f14926020264',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"d082f519-d49c-48f8-824c-8579952c6270","hookName":"js-test-webHook-160073143932209816","hookType":"Webhook","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '498',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '25370f7c-6ec0-4f84-98ea-3d725e3d9398',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '25370f7c-6ec0-4f84-98ea-3d725e3d9398',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:31 GMT'
]);
