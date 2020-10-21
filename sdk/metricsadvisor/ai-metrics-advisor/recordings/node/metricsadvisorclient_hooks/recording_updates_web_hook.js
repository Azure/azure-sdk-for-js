let nock = require('nock');

module.exports.hash = "664ee04c7622dba1427b35fb296bd624";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'cbc6d660-ce88-4cb4-8eb0-f109756317ef',
  'x-envoy-upstream-service-time',
  '689',
  'apim-request-id',
  'cbc6d660-ce88-4cb4-8eb0-f109756317ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270')
  .reply(200, {"hookId":"d082f519-d49c-48f8-824c-8579952c6270","hookName":"js-test-webHook-160073143932209816","hookType":"Webhook","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '352',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '39546445-cc3e-4af5-96c6-ff2ea8f6775c',
  'x-envoy-upstream-service-time',
  '128',
  'apim-request-id',
  '39546445-cc3e-4af5-96c6-ff2ea8f6775c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:26 GMT'
]);
