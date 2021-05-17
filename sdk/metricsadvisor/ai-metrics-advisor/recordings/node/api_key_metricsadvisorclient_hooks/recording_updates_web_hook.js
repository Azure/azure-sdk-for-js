let nock = require('nock');

module.exports.hash = "a75cd018be03a8dcaf5de17b524aa38d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '81596307-edb0-4b2d-876e-c11d2e6fa2a3',
  'x-envoy-upstream-service-time',
  '963',
  'apim-request-id',
  '81596307-edb0-4b2d-876e-c11d2e6fa2a3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b')
  .reply(200, {"hookId":"1005f307-4cb0-40cf-8c17-e2160babcd1b","hookName":"js-test-webHook-162105184287407101","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6b5a0f35-042e-41d1-8592-51f48f3d7833',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '6b5a0f35-042e-41d1-8592-51f48f3d7833',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:46 GMT'
]);
