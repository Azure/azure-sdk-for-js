let nock = require('nock');

module.exports.hash = "91d3d06711b1681805cbc9acda693f60";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-164264038100308708","js-test-webHook-":"js-test-webHook-164264038100303372"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-164264038100308708","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/afe109eb-27f8-42d3-be1f-cad1a1f0da54',
  'x-request-id',
  '0dbd71f9-63ff-4f89-90d5-8aaee1a53a68',
  'x-envoy-upstream-service-time',
  '232',
  'apim-request-id',
  '0dbd71f9-63ff-4f89-90d5-8aaee1a53a68',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/afe109eb-27f8-42d3-be1f-cad1a1f0da54')
  .reply(200, {"hookId":"afe109eb-27f8-42d3-be1f-cad1a1f0da54","hookName":"js-test-emailHook-164264038100308708","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a589b7c2-6d6c-4a88-896c-3100551a329b',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'a589b7c2-6d6c-4a88-896c-3100551a329b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:40 GMT'
]);
