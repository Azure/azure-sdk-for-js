let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160530501380902015","js-test-webHook-":"js-test-webHook-160530501380909561"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160530501380902015","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d',
  'x-request-id',
  'ed9ec5a1-6f0b-4eca-97d3-fe856add5110',
  'x-envoy-upstream-service-time',
  '390',
  'apim-request-id',
  'ed9ec5a1-6f0b-4eca-97d3-fe856add5110',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/8ee27014-a775-4e18-b846-8ce3acea698d')
  .reply(200, {"hookId":"8ee27014-a775-4e18-b846-8ce3acea698d","hookName":"js-test-emailHook-160530501380902015","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5502b990-97de-4baa-9ffa-0f6f9d4eeb95',
  'x-envoy-upstream-service-time',
  '312',
  'apim-request-id',
  '5502b990-97de-4baa-9ffa-0f6f9d4eeb95',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:03:34 GMT'
]);
