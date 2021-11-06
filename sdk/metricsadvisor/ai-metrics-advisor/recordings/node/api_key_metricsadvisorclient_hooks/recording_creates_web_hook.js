let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163616448988408780","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/84968cc8-b283-4bce-b2f1-eba0fa853c17',
  'x-request-id',
  '8355a81e-7940-464e-a548-79a9e44fc442',
  'x-envoy-upstream-service-time',
  '1021',
  'apim-request-id',
  '8355a81e-7940-464e-a548-79a9e44fc442',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/84968cc8-b283-4bce-b2f1-eba0fa853c17')
  .reply(200, {"hookId":"84968cc8-b283-4bce-b2f1-eba0fa853c17","hookName":"js-test-webHook-163616448988408780","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3e003ce9-2bc4-4d94-a86a-bcee7999a3e3',
  'x-envoy-upstream-service-time',
  '161',
  'apim-request-id',
  '3e003ce9-2bc4-4d94-a86a-bcee7999a3e3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:12 GMT'
]);
