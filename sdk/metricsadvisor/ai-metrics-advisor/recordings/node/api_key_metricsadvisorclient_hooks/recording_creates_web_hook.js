let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163636435782604310","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/5dfb93fa-fc9a-4725-af2b-c604e303336b',
  'x-request-id',
  '1d258b0e-00f5-4e01-8bb5-d1faf5ddc1c0',
  'x-envoy-upstream-service-time',
  '875',
  'apim-request-id',
  '1d258b0e-00f5-4e01-8bb5-d1faf5ddc1c0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:19 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/5dfb93fa-fc9a-4725-af2b-c604e303336b')
  .reply(200, {"hookId":"5dfb93fa-fc9a-4725-af2b-c604e303336b","hookName":"js-test-webHook-163636435782604310","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '04f85f12-fbdf-4af3-90d6-87d56f772059',
  'x-envoy-upstream-service-time',
  '155',
  'apim-request-id',
  '04f85f12-fbdf-4af3-90d6-87d56f772059',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:19 GMT'
]);
