let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163636435782600770","js-test-webHook-":"js-test-webHook-163636435782604310"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163636435782600770","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/2531af07-9d0f-4cda-9b03-4284a940c710',
  'x-request-id',
  'b27b9e49-5c77-4f18-8bcc-7c61f84765cf',
  'x-envoy-upstream-service-time',
  '325',
  'apim-request-id',
  'b27b9e49-5c77-4f18-8bcc-7c61f84765cf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:18 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/2531af07-9d0f-4cda-9b03-4284a940c710')
  .reply(200, {"hookId":"2531af07-9d0f-4cda-9b03-4284a940c710","hookName":"js-test-emailHook-163636435782600770","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b2d024b1-8027-4b93-96a6-f02650c00317',
  'x-envoy-upstream-service-time',
  '136',
  'apim-request-id',
  'b2d024b1-8027-4b93-96a6-f02650c00317',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:18 GMT'
]);
