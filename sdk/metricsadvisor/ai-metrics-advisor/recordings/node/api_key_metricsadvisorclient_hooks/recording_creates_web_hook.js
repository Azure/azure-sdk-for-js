let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163702282957004992","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/e86dd6fb-ec6a-4b29-98f5-172a91f3db69',
  'x-request-id',
  '893abd6d-7c7c-4453-9860-e181de82b7e6',
  'x-envoy-upstream-service-time',
  '515',
  'apim-request-id',
  '893abd6d-7c7c-4453-9860-e181de82b7e6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/e86dd6fb-ec6a-4b29-98f5-172a91f3db69')
  .reply(200, {"hookId":"e86dd6fb-ec6a-4b29-98f5-172a91f3db69","hookName":"js-test-webHook-163702282957004992","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7f34a03b-4974-4b45-a87a-8178bfaeb6e9',
  'x-envoy-upstream-service-time',
  '152',
  'apim-request-id',
  '7f34a03b-4974-4b45-a87a-8178bfaeb6e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:49 GMT'
]);
