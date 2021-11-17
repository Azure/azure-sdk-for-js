let nock = require('nock');

module.exports.hash = "6376e4be60f1e0ab33154cc794cd4a79";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-163702282957003574","js-test-webHook-":"js-test-webHook-163702282957004992"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-163702282957003574","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/7ba3c3b1-f3d3-4598-ae87-ac584020c641',
  'x-request-id',
  'f16f8b91-d49b-42c7-814b-bc2bb6da6675',
  'x-envoy-upstream-service-time',
  '381',
  'apim-request-id',
  'f16f8b91-d49b-42c7-814b-bc2bb6da6675',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/7ba3c3b1-f3d3-4598-ae87-ac584020c641')
  .reply(200, {"hookId":"7ba3c3b1-f3d3-4598-ae87-ac584020c641","hookName":"js-test-emailHook-163702282957003574","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f6527f2b-1790-4c8b-8776-b3e478ce6818',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  'f6527f2b-1790-4c8b-8776-b3e478ce6818',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:49 GMT'
]);
