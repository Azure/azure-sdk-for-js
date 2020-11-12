let nock = require('nock');

module.exports.hash = "dcaee46d0224346b07b3d745415de1d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"776297a1-f283-420e-beb2-cc0564b4d7dc","hookName":"js-test-emailHook-160522268489006407","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=1"}, [
  'Content-Length',
  '411',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '87814090-3b6a-49f1-9862-5a30abf6f366',
  'x-envoy-upstream-service-time',
  '404',
  'apim-request-id',
  '87814090-3b6a-49f1-9862-5a30abf6f366',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:31 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"44eec0cb-3b62-4e46-a830-cf5b2592dfa8","hookName":"js-test-webHook-160522268489009591","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$top=1&$skip=2"}, [
  'Content-Length',
  '492',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '989b128a-f549-4c60-b837-9b592e6b0d6a',
  'x-envoy-upstream-service-time',
  '316',
  'apim-request-id',
  '989b128a-f549-4c60-b837-9b592e6b0d6a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:11:31 GMT'
]);
