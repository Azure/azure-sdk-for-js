let nock = require('nock');

module.exports.hash = "9be0384c2bf274adc260c397128a3dc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160530501380909561","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac',
  'x-request-id',
  '04a371e7-61a3-47ed-8c8e-d0fc065beaed',
  'x-envoy-upstream-service-time',
  '1079',
  'apim-request-id',
  '04a371e7-61a3-47ed-8c8e-d0fc065beaed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac')
  .reply(200, {"hookId":"7fac001b-9aa9-43c9-9d7f-4d79a3b6f2ac","hookName":"js-test-webHook-160530501380909561","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a8e2bfde-1187-4dc4-bad8-7fe7368f4164',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  'a8e2bfde-1187-4dc4-bad8-7fe7368f4164',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:35 GMT'
]);
