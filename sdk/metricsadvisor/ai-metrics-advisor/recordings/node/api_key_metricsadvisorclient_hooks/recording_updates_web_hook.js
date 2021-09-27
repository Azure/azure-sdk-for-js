let nock = require('nock');

module.exports.hash = "4538131073c0be8d2c3b7d9323573a49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74', {"hookType":"Webhook","hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder"}})
  .reply(200, {"hookId":"800bcc70-1f2b-4ca9-937c-d19453993b74","hookName":"js-test-webHook-162266592635409328","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e623a6ef-953b-46e9-956a-e6cbabc31850',
  'x-envoy-upstream-service-time',
  '958',
  'apim-request-id',
  'e623a6ef-953b-46e9-956a-e6cbabc31850',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74')
  .reply(200, {"hookId":"800bcc70-1f2b-4ca9-937c-d19453993b74","hookName":"js-test-webHook-162266592635409328","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user1","password":"SecretPlaceholder","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '380',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5ddd4b89-4939-434f-9e1e-b26a7a85ed48',
  'x-envoy-upstream-service-time',
  '5208',
  'apim-request-id',
  '5ddd4b89-4939-434f-9e1e-b26a7a85ed48',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:21 GMT'
]);
