let nock = require('nock');

module.exports.hash = "6f0858a8a1c852a2b58efd48a1c63d3e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-163978361806507112","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b',
  'x-request-id',
  'cbb3b970-5109-451a-a7bb-3e89ae0eabfa',
  'x-envoy-upstream-service-time',
  '323',
  'apim-request-id',
  'cbb3b970-5109-451a-a7bb-3e89ae0eabfa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:26:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/hooks/1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b')
  .reply(200, {"hookId":"1eaaf272-4ac4-4e9f-8b10-c23b0bd2597b","hookName":"js-test-webHook-163978361806507112","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}}, [
  'Content-Length',
  '291',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd688ee22-a390-47c0-ab59-21327678e49c',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  'd688ee22-a390-47c0-ab59-21327678e49c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:26:58 GMT'
]);
