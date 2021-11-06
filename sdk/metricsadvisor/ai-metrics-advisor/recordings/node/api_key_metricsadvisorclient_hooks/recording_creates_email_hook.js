let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163616448988405339","js-test-webHook-":"js-test-webHook-163616448988408780"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163616448988405339","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/604c4044-51e4-4456-b76b-82482d96b45a',
  'x-request-id',
  '09846f1c-1482-4300-861c-0d5668cb99b4',
  'x-envoy-upstream-service-time',
  '410',
  'apim-request-id',
  '09846f1c-1482-4300-861c-0d5668cb99b4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:10 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/604c4044-51e4-4456-b76b-82482d96b45a')
  .reply(200, {"hookId":"604c4044-51e4-4456-b76b-82482d96b45a","hookName":"js-test-emailHook-163616448988405339","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c154d34c-d1d8-4540-954c-0c920987bc7f',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  'c154d34c-d1d8-4540-954c-0c920987bc7f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:11 GMT'
]);
