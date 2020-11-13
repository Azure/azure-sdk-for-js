let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160529681071108921","js-test-webHook-":"js-test-webHook-160529681071104557"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160529681071108921","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc',
  'x-request-id',
  'ed188842-ab40-4318-9641-29aab5867af8',
  'x-envoy-upstream-service-time',
  '428',
  'apim-request-id',
  'ed188842-ab40-4318-9641-29aab5867af8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:50 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc')
  .reply(200, {"hookId":"c2696e26-17f0-4c9f-9aa3-1982e7fed1bc","hookName":"js-test-emailHook-160529681071108921","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '85a14bbe-e67b-4da3-af53-0a5ebca68bff',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '85a14bbe-e67b-4da3-af53-0a5ebca68bff',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:50 GMT'
]);
