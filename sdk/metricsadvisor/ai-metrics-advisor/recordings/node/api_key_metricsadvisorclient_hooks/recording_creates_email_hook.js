let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163978361806502579","js-test-webHook-":"js-test-webHook-163978361806507112"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('//metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163978361806502579","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/7802fdc6-70d2-4bf5-9837-cdc84eac95b1',
  'x-request-id',
  'b3944150-f620-49b7-bd6f-0915e928f05b',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  'b3944150-f620-49b7-bd6f-0915e928f05b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:26:57 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/hooks/7802fdc6-70d2-4bf5-9837-cdc84eac95b1')
  .reply(200, {"hookId":"7802fdc6-70d2-4bf5-9837-cdc84eac95b1","hookName":"js-test-emailHook-163978361806502579","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c245c04c-ab61-4ac3-82b4-6de43d45cf9a',
  'x-envoy-upstream-service-time',
  '170',
  'apim-request-id',
  'c245c04c-ab61-4ac3-82b4-6de43d45cf9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:26:57 GMT'
]);
