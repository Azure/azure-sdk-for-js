let nock = require('nock');

module.exports.hash = "9be0384c2bf274adc260c397128a3dc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160522268489009591","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/44eec0cb-3b62-4e46-a830-cf5b2592dfa8',
  'x-request-id',
  '75dfc161-fa3f-434e-bcda-585a05fa8dc4',
  'x-envoy-upstream-service-time',
  '762',
  'apim-request-id',
  '75dfc161-fa3f-434e-bcda-585a05fa8dc4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:27 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/44eec0cb-3b62-4e46-a830-cf5b2592dfa8')
  .reply(200, {"hookId":"44eec0cb-3b62-4e46-a830-cf5b2592dfa8","hookName":"js-test-webHook-160522268489009591","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2746ccb4-75db-4042-ad04-14bfd337f8d0',
  'x-envoy-upstream-service-time',
  '518',
  'apim-request-id',
  '2746ccb4-75db-4042-ad04-14bfd337f8d0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:27 GMT'
]);
