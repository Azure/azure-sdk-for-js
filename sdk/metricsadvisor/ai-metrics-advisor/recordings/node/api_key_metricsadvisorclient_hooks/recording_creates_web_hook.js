let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163651112651900484","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/6cf4555e-321e-4702-a0ad-48ac2b698d2a',
  'x-request-id',
  'c641be06-91d0-4c5a-9cda-a5575ff3908b',
  'x-envoy-upstream-service-time',
  '746',
  'apim-request-id',
  'c641be06-91d0-4c5a-9cda-a5575ff3908b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/6cf4555e-321e-4702-a0ad-48ac2b698d2a')
  .reply(200, {"hookId":"6cf4555e-321e-4702-a0ad-48ac2b698d2a","hookName":"js-test-webHook-163651112651900484","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '917ddc8d-1a4e-4f6f-bf31-6f07803202d8',
  'x-envoy-upstream-service-time',
  '211',
  'apim-request-id',
  '917ddc8d-1a4e-4f6f-bf31-6f07803202d8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:28 GMT'
]);
