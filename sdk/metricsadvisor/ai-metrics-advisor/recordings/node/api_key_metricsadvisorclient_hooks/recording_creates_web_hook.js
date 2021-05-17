let nock = require('nock');

module.exports.hash = "f45b14607343ef5ffa520f5a98da405f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-162105184287407101","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b',
  'x-request-id',
  'a9a2460f-6743-4fac-a036-da0d5b4041ef',
  'x-envoy-upstream-service-time',
  '847',
  'apim-request-id',
  'a9a2460f-6743-4fac-a036-da0d5b4041ef',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:44 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/1005f307-4cb0-40cf-8c17-e2160babcd1b')
  .reply(200, {"hookId":"1005f307-4cb0-40cf-8c17-e2160babcd1b","hookName":"js-test-webHook-162105184287407101","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cdf043d6-8336-444e-9f5f-f3b085cd1c0d',
  'x-envoy-upstream-service-time',
  '146',
  'apim-request-id',
  'cdf043d6-8336-444e-9f5f-f3b085cd1c0d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:44 GMT'
]);
