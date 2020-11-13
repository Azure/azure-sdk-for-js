let nock = require('nock');

module.exports.hash = "2e82caedae6eb6c5cb61d53e57d2bdcb";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160530449676503144","js-test-webHook-":"js-test-webHook-160530449676502399"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160530449676503144","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400',
  'x-request-id',
  'e7459221-d5ca-4d6e-9485-fc232e3ce3a5',
  'x-envoy-upstream-service-time',
  '555',
  'apim-request-id',
  'e7459221-d5ca-4d6e-9485-fc232e3ce3a5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:56 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/6d3f3d41-4114-458d-bf45-a3fbcd78a400')
  .reply(200, {"hookId":"6d3f3d41-4114-458d-bf45-a3fbcd78a400","hookName":"js-test-emailHook-160530449676503144","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '81aba1bd-e14b-4474-a5a4-3cf60588926f',
  'x-envoy-upstream-service-time',
  '154',
  'apim-request-id',
  '81aba1bd-e14b-4474-a5a4-3cf60588926f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:57 GMT'
]);
