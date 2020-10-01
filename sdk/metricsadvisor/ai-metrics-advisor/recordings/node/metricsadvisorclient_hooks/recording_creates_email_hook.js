let nock = require('nock');

module.exports.hash = "9167e07561ad7e747ff1ffc7888e9b1c";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-160073143932207624","js-test-webHook-":"js-test-webHook-160073143932209816"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-160073143932207624","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70',
  'x-request-id',
  'e02d1430-0a69-46b2-a630-d1c0403f29de',
  'x-envoy-upstream-service-time',
  '441',
  'apim-request-id',
  'e02d1430-0a69-46b2-a630-d1c0403f29de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70')
  .reply(200, {"hookId":"76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70","hookName":"js-test-emailHook-160073143932207624","hookType":"Email","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"toList":["test@example.com"],"ccList":null,"bccList":null}}, [
  'Content-Length',
  '275',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '92815220-aa65-485d-a8a2-22362d78aab7',
  'x-envoy-upstream-service-time',
  '270',
  'apim-request-id',
  '92815220-aa65-485d-a8a2-22362d78aab7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:21 GMT'
]);
