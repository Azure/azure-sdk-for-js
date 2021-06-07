let nock = require('nock');

module.exports.hash = "fef9512daf1968a4c750b0e161a6cc2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-162266592635409328","description":"description","hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74',
  'x-request-id',
  '5710e2dd-b791-42c8-bf4d-809321b4a3d9',
  'x-envoy-upstream-service-time',
  '6760',
  'apim-request-id',
  '5710e2dd-b791-42c8-bf4d-809321b4a3d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/800bcc70-1f2b-4ca9-937c-d19453993b74')
  .reply(200, {"hookId":"800bcc70-1f2b-4ca9-937c-d19453993b74","hookName":"js-test-webHook-162266592635409328","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://mawebhook.azurewebsites.net/api/HttpTrigger","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '376',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '099aac02-7243-447f-8c31-bffe11b08e0c',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  '099aac02-7243-447f-8c31-bffe11b08e0c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:14 GMT'
]);
